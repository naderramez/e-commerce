import { graphql } from "../../graphql/generated";

export const GET_CURRENCIES = graphql(`
  query currencies {
    currencies {
      label
      symbol
    }
  }
`);
