import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../store/actions';
import PostBox from './ui/PostBox';
import CategoryMenu from './ui/categoryMenu';
/**
 * Fetch and display a Category
 */
class LocationCategory extends Component {

  componentDidMount() {
    this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
  }
  componentWillUnmount(){
   // alert('unmount');
   this.props.startCategoryQuery();
  }
  // shouldComponentUpdate(prevProps){
    
  //   if ( prevProps.match.params.parent !== this.props.match.params.parent ){
  //     return true;
  //   }
  //     return true;
  // }
  componentWillUpdate(nextProps) {
    if ( nextProps.match.params.parent !== this.props.match.params.parent  ){
      //this.props.onCategoryQuery(nextProps.client , nextProps.match.params.slug );
      //this.props.onCategoryQuery(nextProps.client , nextProps.match.params.slug );
      this.props.startCategoryQuery();
    }
 }
 
 componentDidUpdate(prevProps){
  if ( prevProps.match.params.parent !== this.props.match.params.parent || this.props.match.params.slug !== prevProps.match.params.slug){
    this.props.onCategoryQuery(this.props.client , this.props.match.params.parent ,this.props.match.params.slug);
    
  }
 }

  /**
   * Execute the category query, parse the result and set the state
   */


  render() {
 
    let category = null,
      children = null,
      posts = null;
    if ( this.props.category ){
      category  = this.props.category;
      children = this.props.children;
      posts  = category.posts.map((post, index) => (
        <PostBox post={post} index={index} key={index}></PostBox>
      ));
     
      }

      
      return (<div><div className="pa2">
      <h1>{category ? category.name : null }</h1>
      <div className="flex mt2 items-start">
        <div className="flex items-center" />
        <div className="ml1">
          {posts ? posts : null}
          { children ? (<CategoryMenu categories={children.edges} parent={category} match={this.props.match}>The Categories</CategoryMenu>) : null}
          <div className="f6 lh-copy gray" />
        </div>
      </div>
    </div></div>);
   
  }
}
const mapStateToProps = state => {
  return {
    //  category: {
    //   name: '',
    //   posts: [],
    // },
    category: {
      name: state.category.name,
      id: state.category.id,
      slug: state.category.slug,
      posts: state.category.posts,

    },
    children: state.category.children
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCategoryQuery: (client , slug , parent) => dispatch(actions.executeCategoryQuery(client , slug , parent)),
    startCategoryQuery : () => dispatch(actions.startCategoryQuery()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(LocationCategory));
