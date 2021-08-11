const { get, getExchangeRate } = require("../../controllers/countries");

module.exports = {
  Query: {
    countries: async () => {
      const result = await get();
      return result;
    },
    getExchangeRate: async (_, args) => {
      const result = await getExchangeRate(
        args.base,
        args.currencies,
        args.amount
      );
      return result;
    },
  },
};
