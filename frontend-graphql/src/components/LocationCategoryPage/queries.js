import gql from 'graphql-tag';

export const locationFragment = gql`
fragment alocation on Locations{
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
  `;
  export const CATEGORY_QUERY = gql`
  query CategoryQuery($filter: String , $catFilter: String!,$searchQuery: String,$first: Int,$last: Int, $after: String, $before: String) {
  
      location_categories(where: { slug: [$catFilter] , shouldOnlyIncludeConnectedItems: false , shouldOutputInFlatList: false}){
      edges{
        node{
          name
          slug
          thecolor
          termTaxonomyId
          location_categoryId
          children (where: {  shouldOnlyIncludeConnectedItems: false , shouldOutputInFlatList: false} ){
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
  
    location( first: $first , last: $last , before: $before, after: $after , where: {
        search: $searchQuery,
        taxQuery: {
          relation: AND,
          taxArray: [
            {
              terms: [$filter],
              taxonomy: LOCATION_CATEGORY,
              operator: IN,
              field: SLUG
            },{
              terms: ["uncategorized"],
              taxonomy: CATEGORY,
              operator: NOT_IN,
              field: SLUG
            }
          ]
        }} ){
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
  