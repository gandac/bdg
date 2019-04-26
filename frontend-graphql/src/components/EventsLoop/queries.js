
import gql from 'graphql-tag';

export const ALL_EVENTS_QUERY = gql`
query AllEventsQuery($searchQuery: String!) {
  
    event( where: {
        search: $searchQuery,
        } ){
      edges {
        node {
          title
          slug
          id
          datetime
          location {
            id
            date
            title
            lat
            lng
          }
          featuredImage{
            sourceUrl
            mediaDetails {
              sizes {
                file
                height
                mimeType
                name
                sourceUrl
                width
              } 
            }
          }
        
        }
      }
    }
  
  }
  
  
  
  
  `;