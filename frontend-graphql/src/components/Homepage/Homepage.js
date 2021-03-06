import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import withPagination,{pagination} from '../../hoc/withPagination';
import Preloader from '../ui/svg/preloader';
import * as mapActions from '../Map/mapActions';
import MapTrigger from  '../ui/mapTrigger';
import {allPostsQuery as allLocationsQuery, startSubcategoryQuery, newLocationsQuery,locationsStart} from '../LocationsLoop/locationsActions';
import {allEventsQuery} from '../EventsLoop/eventsActions';
//import CategoryMenu from '../ui/categoryMenu';
import {startCategoryQuery} from '../LocationCategoryPage/categoryActions';
import LocationPageMarkup from '../ui/pageLayout';
import colorsJson from '../../static/color-configuration.json';
import EventsCarousel from '../EventsLoop/eventsCarousel';
import {setSearchValue} from '../Search/searchActions';
import NewLocationsSlider from './NewLocationsSlider';
import withColor from '../../hoc/withColor';
import GoToInsiders from './goToInsiders';
import './homepage.css';
/**
 * Fetch and display a Category
 */
class Homepage extends Component {

  componentDidMount() {
    //this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
    this.props.locationsStart();
    this.props.startCategoryQuery();
    this.props.getAllLocations(this.props.client , '' ,false );
    this.props.getAllEvents(this.props.client);
    this.props.getNewLocations(this.props.client);
  } 

  render() {
    const currentStyles = {
      ...this.props.currentStyles
    }

      let content = <LocationPageMarkup currentStyles ={currentStyles} />;
      if(this.props.postsLoading){
        content = <LocationPageMarkup currentStyles ={currentStyles} > 
          <Preloader color={currentStyles} type="page"/>  
        </LocationPageMarkup>
      }else{
        
        content = <LocationPageMarkup currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow">
                    <div className="leftSide">
                        {this.props.events ?  
                          <EventsCarousel 
                          events={this.props.events} 
                         color={currentStyles.primary} 
                          /> : null}   
                          {this.props.newLocations ? 
                            ! this.props.isSearch ? 
                              <NewLocationsSlider locations={this.props.newLocations} colors={currentStyles} description={this.props.staticInfo ? this.props.staticInfo.text1 : null}/> : 
                              <NewLocationsSlider locations={this.props.locations} type='search' searchWord={this.props.searchValue} colors={currentStyles} description={this.props.staticInfo ? this.props.staticInfo.text1 : null}/>
                          : null}
                          <GoToInsiders color={currentStyles.primary} info={this.props.staticInfo} />
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
    events: state.events.items,
    isSearch: state.locations.pageType == 'searchPage',
    searchValue: state.search.searchValue,
    locations: state.locations.posts,
    newLocations : state.locations.newPosts,
    staticInfo: state.menus.staticInfo.homepage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleMapActive : () => dispatch(mapActions.toogleMapActive()),
    resetSearchInput: () => dispatch(setSearchValue('')), 
    getAllLocations: (client , search , isSingle, pagination) => dispatch(allLocationsQuery(client , search , isSingle , pagination )),
    getAllEvents: (client) => dispatch(allEventsQuery(client)),
    getNewLocations : (client) => dispatch(newLocationsQuery(client)),
     locationsStart: () => dispatch(locationsStart()),   
     startCategoryQuery : () => dispatch(startCategoryQuery()),
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps) , withApollo , withColor , withPagination )(Homepage);
