const { gql } = require("apollo-server-express");

module.exports = gql`
  type Rate {
    currencyName: String!
    total: Float!
  }
`;
