const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    countries: [Country]!
    getExchangeRate(base: String!, currencies: String!, amount: Float!): [Rate]!
  }
`;
