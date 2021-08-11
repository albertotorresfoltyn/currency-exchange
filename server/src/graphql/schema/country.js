const { gql } = require("apollo-server-express");

module.exports = gql`
  type Country {
    id: ID!
    fullname: String!
    population: Int
    currencies: [Currency]
    code: String
  }
`;
