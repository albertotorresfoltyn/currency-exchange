const { ApolloServer } = require("apollo-server-express");

const { Unauthorized } = require("../errors");
const { Query, Country, Currency, Rate } = require("./schema");
const { getCountriesQueryResolver } = require("./resolvers");
const { getByIdAndToken } = require("../controllers/auth");
const { getById } = require("../controllers/users");
const { verifyAndDecode } = require("../lib/auth");

const server = new ApolloServer({
  typeDefs: [Query, Country, Currency, Rate],
  resolvers: { ...getCountriesQueryResolver },
  introspection: false,
  playground: true,
  context: async ({ req }) => {
    try {
      const { authorization: token } = req.headers;
      const decoded = verifyAndDecode(token);
      const userId = await getByIdAndToken(decoded.id, token);
      const user = await getById(userId);
      return {
        auth: { token },
        user,
      };
    } catch (err) {
      throw new Unauthorized();
    }
  },
});

module.exports = server;
