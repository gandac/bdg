import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

/**
 * GraphQL post query that takes a post slug as a filter
 * Returns the title, content and author of the post
 */
const LOCATION_QUERY = gql`
  query LOCATION_QUERY($filter: String!) {
    location( where: { name : $filter  } ){
      edges {
        node {
          title
          content
          slug
        }
      }
    }
    
  }
`;

/**
 * Fetch and display a Post
 */
class Post extends Component {
  state = {
    post: {
      title: '',
      content: '',
      author: {
        nickname: '',
      },
    },
  };

  componentDidMount() {
    this.executePostQuery();
  }

  /**
   * Execute post query, process the response and set the state
   */
  executePostQuery = async () => {
    const { match, client } = this.props;
    const filter = match.params.slug;
    const result = await client.query({
      query: LOCATION_QUERY,
      variables: { filter },
    });
    console.log(result);
    const post = result.data.location.edges[0].node;
    this.setState({ post });
  };

  render() {
    const { post } = this.state;
    return (
      <div>
        <div className="pa2">
          <h1>{post.title}</h1>
        </div>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        <div></div>
      </div>
    );
  }
}

export default withApollo(Post);
