import { gql } from "@apollo/client";

export const GET_COUNTRIES_INFO_QUERY = gql`
  query {
    countries {
      fullname
      population
      currencies {
        code
        name
        symbol
      }
      code
    }
  }
`;

export const GET_EXCHANGE_RATE_QUERY = gql`
  query getExchangeRate($base: String!, $currencies: String!, $amount: Float!) {
    getExchangeRate(base: $base, currencies: $currencies, amount: $amount) {
      currencyName
      total
    }
  }
`;
