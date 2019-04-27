import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import withColor from '../../hoc/withColor';
import Preloader from '../ui/svg/preloader';
import PostsItems from './postsItems';
import * as actions from './postsActions';
import PageLayout from '../ui/pageLayout';
import {setSearchValue} from '../Search/searchActions';
import './blog.css';
/**
 * Fetch and display a Category
 */
class BlogPosts extends Component {

  componentDidMount() {
    this.props.startPostsQuery();
    if(this.props.match.params.slug ){
      this.props.getCategoriesAndPosts(this.props.client , this.props.match.params.slug ,false);
    }else{
      this.props.getCategoriesAndPosts(this.props.client , false ,true);
    }
  }

  componentWillUpdate(nextProps) {
    if ( this.props.match.params.slug !== nextProps.match.params.slug ){
      this.props.startPostsQuery();
     // this.props.resetSearchInput();
    }
 }
 
 componentDidUpdate(prevProps){
  if (  prevProps.match.params.slug !== this.props.match.params.slug){
    if(this.props.match.params.slug ){
      this.props.getCategoriesAndPosts(this.props.client , this.props.match.params.slug ,false);
    }else{
      this.props.getCategoriesAndPosts(this.props.client , false ,true);
    }
  }
 }
 componentWillUnmount(){
    this.props.resetCategory();
  }
  render() {
    const currentStyles = {
      ...this.props.currentStyles
    }
  let category = null;
    if ( this.props.category ){
        category  = this.props.category;
      }
      let content = <PageLayout currentStyles ={currentStyles} />;
      if(this.props.loading){
        content = <PageLayout currentStyles ={currentStyles} > <Preloader color={currentStyles} type="page"/>  </PageLayout>
      }else{
        let AllPostsItems = this.props.postsLoading ? <Preloader color={currentStyles} type="single"/> :
        <PostsItems posts ={this.props.posts} color={currentStyles}></PostsItems> ;
        content = <PageLayout currentStyles ={currentStyles} >
                  <div className="constraint clearOverflow">
                    <div className="leftSide">
                      {AllPostsItems} 
                    </div>
                    <div className="rightSide">
                      {/* TODO: CATEGORIES SUBMENU */}
                    </div>
                  </div>
                  </PageLayout>

      }
      return content;

  }
}
const mapStateToProps = state => {
  return {
    loading: state.blog.loading,
    category: state.blog.category,
    posts: state.blog.posts
  }
}
const mapDispatchToProps = dispatch => {
  return {
   startPostsQuery : () => dispatch(actions.startPostsQuery()),
   resetCategory : () => dispatch(actions.resetCategory()),
   getCategoriesAndPosts : (client,slug,allCats) => dispatch(actions.executePostsQuery(client,slug,allCats)),
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps) , withApollo, withColor )(BlogPosts);