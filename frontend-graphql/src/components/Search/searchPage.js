import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import queryString from 'query-string';
import withColor from '../../hoc/withColor';
import Preloader from '../ui/svg/preloader';
import * as mapActions from '../Map/mapActions';
import MapTrigger from  '../ui/mapTrigger';
import * as actions from './searchActions';
import * as loopActions from '../LocationsLoop/locationsActions';
import LocationsGrid from '../LocationCategoryPage/locationsGrid';
import PageLayout from '../ui/pageLayout';

/**
 * Fetch and display a Category
 */
class searchPage extends Component {

  componentDidMount() {
  //  console.log(this.props.location.search);
    let params = queryString.parse(this.props.location.search);
    this.props.startLocations();
    this.props.allLocationsQuery(this.props.client , params.s , false);
    // this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
  }

  componentWillUpdate(nextProps) {
    if ( this.props.location.search !== nextProps.location.search  ){
      this.props.startLocations();
    }
 }
 
 componentDidUpdate(prevProps){
  if ( this.props.location.search !== prevProps.location.search){
    let params = queryString.parse(this.props.location.search)
    this.props.allLocationsQuery(this.props.client , params.s , false);
  }
 }
  render() {
    let params = queryString.parse(this.props.location.search);
    const currentStyles = {
      ...this.props.currentStyles
    }
  let locations = null;

    if ( this.props.locations ){
        locations  = this.props.locations;
      }
      let content = <PageLayout currentStyles ={currentStyles} />;
      if(this.props.loading){
        content = <PageLayout currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </PageLayout>
      }else{
        let locationGrid = this.props.postsLoading ? 
        <Preloader color={currentStyles} type="single"/> :
        locations.length > 0 ? 
        <LocationsGrid posts ={locations} color={currentStyles}></LocationsGrid> :
        <h1>No results found for '{params.s}'</h1>;
        content = <PageLayout currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow">
                    <div className="leftSide">
                    
                      {params.s.length > 2  ? <h1>Search results for: '{params.s}'</h1> : <h1>Please search for more than 2 letters</h1>}
                      {params.s.length > 2 ? locationGrid : null} 
                    </div>
                    <div className="rightSide">
                      <MapTrigger onClick={() => this.props.toggleMapActive()} color={currentStyles.accent}/>
                    </div>
                  </div>
               </PageLayout>

      }
      return content;

  }
}
const mapStateToProps = state => {
  return {
    //loading: state.search.loading,
    locations: state.locations.posts,
    postsLoading: state.locations.loading,
    isMapActive: state.map.active
  }
}
const mapDispatchToProps = dispatch => {
  return {
    allLocationsQuery: (client, searchValue , allCats) => dispatch(loopActions.allPostsQuery(client,searchValue,allCats)),
    startLocations : () => dispatch(loopActions.locationsStart()),
    toggleMapActive : () => dispatch(mapActions.toogleMapActive())
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps) , withApollo, withColor )(searchPage);
