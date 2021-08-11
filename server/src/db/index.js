const knex = require("knex");

const knexFile = require("../../knexfile").development;

const db = knex(knexFile);

const insert = (tableName, data) =>
  db(tableName)
    .insert(data)
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error);
    });

const select = (
  tableName,
  options = { fields: [], filteringConditions: [] }
) => {
  const { fields, filteringConditions } = options;
  return db(tableName)
    .select(fields)
    .where((builder) => {
      filteringConditions.forEach((condition) => {
        builder.where(...condition);
      });
    })
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

const update = (
  tableName,
  options = { fields: {}, filteringConditions: [] }
) => {
  const { fields, filteringConditions } = options;
  return db(tableName)
    .where((builder) => {
      filteringConditions.forEach((condition) => {
        builder.where(...condition);
      });
    })
    .update(fields)
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

const remove = (tableName, options = { filteringConditions: [] }) => {
  const { filteringConditions } = options;
  return db(tableName)
    .where((builder) => {
      filteringConditions.forEach((condition) => {
        builder.where(...condition);
      });
    })
    .del()
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

const insertOrUpdate = (tableName, rows, deletePropertyOptions = []) =>
  db.transaction((trx) => {
    const queries = rows.map((data) => {
      // eslint-disable-next-line no-shadow
      const insert = trx(tableName)
        .insert({
          ...data.query,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .toString();
      deletePropertyOptions.forEach((op) => {
        // eslint-disable-next-line no-param-reassign
        delete data.query[op.propertyName];
      });
      // eslint-disable-next-line no-shadow
      const update = trx(tableName)
        .update({
          ...data.query,
          updated_at: new Date(),
        })
        .toString()
        .replace(/^update(.*?)set\s/gi, "");

      return trx
        .raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`)
        .transacting(trx);
    });
    return Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });

const batchInsert = (tableName, rows) =>
  db.transaction((trx) => {
    const queries = rows.map((row) => {
      // eslint-disable-next-line no-shadow
      const insert = trx(tableName)
        .insert({
          ...row,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .toString();

      return trx.raw(`${insert}`).transacting(trx);
    });
    return Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });

module.exports = {
  insert,
  select,
  update,
  remove,
  insertOrUpdate,
  batchInsert,
};
