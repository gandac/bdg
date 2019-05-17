
import gql from 'graphql-tag';

export const ALL_LOCATIONS_QUERY = gql`
  query AllPostsQuery($searchQuery: String,$slug: String, $first:Int, $last:Int , $before:String , $after:String) {
  
    location( first: $first , last:$last ,after:$after , before:$before  ,where: {
        search: $searchQuery,
        name: $slug
        } ){
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
      edges {
        cursor
        
        node {
          title
          slug
          lat
          lng
          id
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
          location_categories {
            edges {
              node {
                location_categoryId
                name
                thecolor
                link
                children {
                  edges {
                    node {
                      name
                      link
                      slug
                      termTaxonomyId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  
  }
  
  
  `;

  export const NEW_LOCATIONS_QUERY = gql`
  
  query AllPostsQuery($year: Int!,$month: Int!,$day: Int!) {
  
    location( first: 6, after: null ,where: {
      orderby:{
        field: DATE,
        order: DESC
      }
      dateQuery: {
        after: {
          year: $year,
          month: $month,
          day: $day
        }
      }
        } ){
      edges {
        node {
          title
          slug
          lat
          lng
          id
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
          location_categories {
            edges {
              node {
                location_categoryId
                name
                thecolor
                link
                children {
                  edges {
                    node {
                      name
                      link
                      slug
                      termTaxonomyId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  
  }
  `