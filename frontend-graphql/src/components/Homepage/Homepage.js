import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {compose} from 'recompose';
import {connect} from 'react-redux';

import Preloader from '../ui/svg/preloader';
import * as mapActions from '../Map/mapActions';
import MapTrigger from  '../ui/mapTrigger';
import {allPostsQuery} from '../LocationsLoop/locationsActions';
//import CategoryMenu from '../ui/categoryMenu';
import LocationPageMarkup from '../LocationCategoryPage/locationPageMarkup';
import colorsJson from '../../static/color-configuration.json';
import {setSearchValue} from '../Search/searchActions';

/**
 * Fetch and display a Category
 */
class Homepage extends Component {

  componentDidMount() {
    //this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
    this.props.onAllPropsQuery(this.props.client )
  } 
  render() {
    const currentStyles = {
      ...colorsJson.colorset1.layoutColors
    }
      let content = <LocationPageMarkup currentStyles ={currentStyles} />;
      if(this.props.postsLoading){
        content = <LocationPageMarkup currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </LocationPageMarkup>
      }else{
        
        content = <LocationPageMarkup currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow">
                    <div className="leftSide">

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
    isMapActive: state.map.active,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleMapActive : () => dispatch(mapActions.toogleMapActive()),
    resetSearchInput: () => dispatch(setSearchValue('')), 
    onAllPropsQuery: (client) => dispatch(allPostsQuery(client))
        
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps) , withApollo )(Homepage);
