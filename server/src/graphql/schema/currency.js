const { gql } = require("apollo-server-express");

module.exports = gql`
  type Currency {
    code: String
    name: String
    symbol: String
  }
`;
