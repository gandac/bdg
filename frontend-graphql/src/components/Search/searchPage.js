import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import withColor from '../../hoc/withColor';
import Preloader from '../ui/svg/preloader';
import * as mapActions from '../Map/mapActions';
import MapTrigger from  '../ui/mapTrigger';
import * as actions from './categoryActions';
import * as loopActions from '../LocationsLoop/locationsActions';
import CategoryMenu from '../ui/categoryMenu';
import LocationsGrid from './locationsGrid';
import LocationPageMarkup from './locationPageMarkup';

/**
 * Fetch and display a Category
 */
class searchPage extends Component {

  componentDidMount() {
    this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
  }

  componentWillUpdate(nextProps) {
    if ( nextProps.match.params.parent !== this.props.match.params.parent  ){
       this.props.startCategoryQuery();
    }
    if ( this.props.match.params.slug !== nextProps.match.params.slug ){
      this.props.startSubcategoryQuery();
    }
 }
 
 componentDidUpdate(prevProps){
  if ( prevProps.match.params.parent !== this.props.match.params.parent ||  prevProps.match.params.slug !== this.props.match.params.slug){
    this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
  }
  if ( this.props.match.params.slug !== prevProps.match.params.slug ){
    //this.setState({...this.state,productLoading: false});
  }
 }
  render() {
    const currentStyles = {
      ...this.props.currentStyles
    }
  let category = null,
      subcategories = null;
    

    if ( this.props.category ){
        category  = this.props.category;

      }
      let content = <LocationPageMarkup currentStyles ={currentStyles} />;
      if(this.props.loading){
        content = <LocationPageMarkup currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </LocationPageMarkup>
      }else{
        let locationGrid = this.props.postsLoading ? <Preloader color={currentStyles} type="single"/> :
        <LocationsGrid posts ={category.posts} color={currentStyles}></LocationsGrid> ;
        content = <LocationPageMarkup currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow">
                    <div className="leftSide">
                      {locationGrid} 
                    </div>
                    <div className="rightSide">
                      <MapTrigger onClick={() => this.props.toggleMapActive()} color={currentStyles.accent}/>
                    </div>
                  </div>
               </LocationPageMarkup>

      }
      return content;

  }
}
const mapStateToProps = state => {
  return {
    loading: state.category.loading,
    postsLoading: state.locations.loading,
    children: state.category.children,
    isMapActive: state.map.active
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCategoryQuery: (client , slug , parent) => dispatch(actions.executeCategoryQuery(client , slug , parent)),
    startCategoryQuery : () => dispatch(actions.startCategoryQuery()),
    startSubcategoryQuery :() => dispatch(loopActions.startSubcategoryQuery()),
    toggleMapActive : () => dispatch(mapActions.toogleMapActive())
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps) , withApollo, withColor )(searchPage);
