import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

/**
 * GraphQL category query that takes a category slug as a filter
 * Returns the posts belonging to the category and the category name and ID
 */
const CATEGORY_QUERY = gql`
query CategoryQuery($filter: String!) {
  location( where: {
      taxQuery: {
        relation: OR,
        taxArray: [
          {
            terms: [$filter],
            taxonomy: LOCATION_CATEGORY,
            operator: IN,
            field: SLUG
          },
          {
            terms: ["uncategorized"],
            taxonomy: CATEGORY,
            operator: IN,
            field: SLUG
          }
        ]
      }} ){
    edges {
      node {
        title
        slug
      }
    }
  }
  location_categories(where: { slug: [$filter] }){
    edges{
      node{
        name
        slug
        termTaxonomyId
      	location_categoryId
        
      }
    }
  }
}


`;

/**
 * Fetch and display a Category
 */
class LocationCategory extends Component {
  state = {
    category: {
      name: '',
      posts: [],
    },
  };

  componentDidMount() {
    this.executeCategoryQuery(false);
  }
  componentWillReceiveProps(nextProps) {
   this.executeCategoryQuery(nextProps);
 }

  /**
   * Execute the category query, parse the result and set the state
   */
  executeCategoryQuery = async (nextProps) => {
    const { match, client } = nextProps ? nextProps : this.props;
    
    const filter = match.params.slug;
    const result = await client.query({
      query: CATEGORY_QUERY,
      variables: { filter },
    });
    const { name } = result.data.location_categories.edges[0].node;
    let posts = result.data.location.edges;
    posts = posts.map(post => {
      const finalLink = `/location/${post.node.slug}`;
      const modifiedPost = { ...post };
      modifiedPost.node.link = finalLink;
      return modifiedPost;
    });

    const category = {
      name,
      posts,
    };
    this.setState({ category });
  };

  render() {
    const { category } = this.state;
    return (
      <div className="pa2">
        <h1>{category.name}</h1>
        <div className="flex mt2 items-start">
          <div className="flex items-center" />
          <div className="ml1">
            {category.posts.map((post, index) => (
              <div key={post.node.slug}>
                <span className="gray">{index + 1}.</span>
                <Link to={post.node.link} className="ml1 black">
                  {post.node.title}
                </Link>
              </div>
            ))}
            <div className="f6 lh-copy gray" />
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(LocationCategory);
