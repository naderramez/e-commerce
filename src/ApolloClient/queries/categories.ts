import { graphql } from "../../graphql/generated";

export const GET_CATEGORIES = graphql(`
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
`);

export const GET_CATEGORIES_NAMES = graphql(`
  query getCategoriesNames {
    categories {
      name
    }
  }
`);
