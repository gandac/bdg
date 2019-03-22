import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import PostBox from './ui/PostBox';

/**
 * Fetch and display a Category
 */
class LocationCategory extends Component {
  state = {
    // category: {
    //   name: '',
    //   posts: [],
    // },
  };

  componentDidMount() {
    this.props.onCategoryQuery(this.props.client , this.props.match.params.slug);
  }
  componentWillUnmount(){
   // alert('unmount');
   this.props.startCategoryQuery();
  }
  
  componentWillUpdate(nextProps) {
    if ( nextProps.match.params.slug !== this.props.match.params.slug){
      //this.props.onCategoryQuery(nextProps.client , nextProps.match.params.slug );
      //this.props.onCategoryQuery(nextProps.client , nextProps.match.params.slug );
      this.props.startCategoryQuery();
    }
 }
 componentDidUpdate(prevProps){
  if ( prevProps.match.params.slug !== this.props.match.params.slug){
    this.props.onCategoryQuery(this.props.client , this.props.match.params.slug );
  }
 }

  /**
   * Execute the category query, parse the result and set the state
   */


  render() {
    let theReturn = null;
    if ( this.props.category ){
    const category  = this.props.category;
    const posts  = category.posts.map((post, index) => (
        <PostBox post={post} index={index} key={index}></PostBox>
      ))
     theReturn = (
          <div className="pa2">
            <h1>{category.name}</h1>
            <div className="flex mt2 items-start">
              <div className="flex items-center" />
              <div className="ml1">
                {posts}
                <div className="f6 lh-copy gray" />
              </div>
            </div>
          </div>
        );
    }
    
    return (<div>{theReturn}</div>);
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
      posts: state.category.posts,
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCategoryQuery: (client , slug) => dispatch(actions.executeCategoryQuery(client , slug)),
    startCategoryQuery : () => dispatch(actions.startCategoryQuery()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(LocationCategory));
