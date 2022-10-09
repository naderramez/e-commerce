import { gql } from "@apollo/client";

const getCategories = gql`
  query getCategories {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const getCategoriesNames = gql`
  query getCategoriesNames {
    categories {
      name
    }
  }
`;
