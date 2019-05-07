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
import withPagination,{Pagination} from '../../hoc/withPagination';
import PageLayout from '../ui/pageLayout';
import {setSearchValue} from '../Search/searchActions';

/**
 * Fetch and display a Category
 */
class LocationCategoryPage extends Component {
  componentDidMount() {
    this.props.startCategoryQuery();
    
    this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug , '' , this.props.initialPagination );
  }

  // shouldComponentUpdate(prevProps){
    
  //   if ( prevProps.match.params.parent !== this.props.match.params.parent ){
  //     return true;
  //   }
  //     return true;
  // }

  componentWillUpdate(nextProps) {
    if ( nextProps.match.params.parent !== this.props.match.params.parent  ){
       this.props.startCategoryQuery();
       this.props.resetSearchInput();
    }
    if ( this.props.match.params.slug !== nextProps.match.params.slug ){
      this.props.startSubcategoryQuery();
      this.props.resetSearchInput();
    }
 }
 
 componentDidUpdate(prevProps){
  if ( prevProps.match.params.parent !== this.props.match.params.parent ||  prevProps.match.params.slug !== this.props.match.params.slug){
    this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug , '' , this.props.initialPagination);
  }
  if ( this.props.match.params.slug !== prevProps.match.params.slug ){
    //this.setState({...this.state,productLoading: false});
  }
 }
 componentWillUnmount(){
    this.props.resetCategory();
  }
  render() {
    const currentStyles = {
      ...this.props.currentStyles
    }
  let category = null,
      subcategories = null;
    

    if ( this.props.category ){
        category  = this.props.category;
        subcategories = this.props.children;
      }
      let content = <PageLayout currentStyles ={currentStyles} />;
      if(this.props.loading){
        content = <PageLayout currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </PageLayout>
      }else{
        let locationGrid = this.props.postsLoading ? <Preloader color={currentStyles} type="single"/> :
        <LocationsGrid posts ={category.posts} color={currentStyles}></LocationsGrid> ;
        content = <PageLayout currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow">
                    <div className="leftSide">
                      {locationGrid} 
                      {this.props.paginationInfo.any ? <Pagination displayInfo={this.props.paginationInfo} nextPage={() => this.props.paginate(1)} prevPage={() => this.props.paginate(-1)} /> : null}
                    </div>
                    <div className="rightSide">
                      { subcategories ? (<CategoryMenu categories={subcategories.edges} parent={category} match={this.props.match}></CategoryMenu>) : null}
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

    category: {
      name: state.category.name,
      id: state.category.id,
      slug: state.category.slug,
      posts: state.locations.posts,
      // posts.loading : state.category.postsLoading
    },
    loading: state.category.loading,

    postsLoading: state.locations.loading,
    children: state.category.children,
    isMapActive: state.map.active
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCategoryQuery: (client , slug , parent,search , pagination) => dispatch(actions.executeCategoryQuery(client , slug , parent , search , pagination)),
    startCategoryQuery : () => dispatch(actions.startCategoryQuery()),
    startSubcategoryQuery :() => dispatch(loopActions.startSubcategoryQuery()),
    toggleMapActive : () => dispatch(mapActions.toogleMapActive()),
    resetSearchInput: () => dispatch(setSearchValue('')), 
    resetCategory : () => dispatch(actions.resetCategory()),
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps) , withApollo, withColor , withPagination )(LocationCategoryPage);
