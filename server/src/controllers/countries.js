const got = require("got");
const db = require("../db");

const {
  COUNTRY_INFO_URL,
  EXCHANGE_RATE_CONVERT_URL,
  EXCHANGE_RATE_CONVERT_KEY,
} = process.env;
const populateDB = async () => {
  try {
    const { body } = await got(COUNTRY_INFO_URL, {
      responseType: "json",
    });
    const countryNames = body.map((country) => ({
      fullname: country.name,
      population: country.population,
      currencies: JSON.stringify(country.currencies),
      code: country.alpha3Code,
    }));
    db.batchInsert("countries", countryNames);
  } catch (e) {
    throw new Error(
      `Error fetching and population the db with countries. Error: ${e.message}`
    );
  }
};

const get = async () => {
  const dbResponse = await db.select("countries");
  if (Array.isArray(dbResponse) && dbResponse.length > 0) {
    const countries = dbResponse.map((e) => ({
      id: e.id,
      fullname: e.fullname,
      population: e.population,
      currencies: JSON.parse(e.currencies),
      code: e.code,
    }));
    return countries;
  }
  await populateDB();
  return get();
};

const getExchangeRate = async (base, currencies, amount = 1) => {
  try {
    // console.log("base", base);
    // console.log("currencies", currencies);
    // console.log("amount", amount);
    const url = `${EXCHANGE_RATE_CONVERT_URL}/latest?access_key=${EXCHANGE_RATE_CONVERT_KEY}&base=${base}&symbols=${currencies}`;
    const { body } = await got(url, {
      responseType: "json",
    });
    if (body && body.rates) {
      const currencyNames = Object.keys(body.rates);
      const result = [];
      currencyNames.forEach((currencyName) => {
        if (base !== currencyName) {
          const rate = body.rates[currencyName];
          const total = amount * rate;
          result.push({
            currencyName,
            total,
          });
        }
      });
      return result;
    }
  } catch (e) {
    throw new Error(
      `Error fetching geting the exchange rate. Error: ${e.message}`
    );
  }
  return [];
};

module.exports = {
  get,
  getExchangeRate,
};
