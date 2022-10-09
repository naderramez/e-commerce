import { gql } from "@apollo/client";

const getCurrencies = gql`
  query currencies {
    currencies {
      label
      symbol
    }
  }
`;
