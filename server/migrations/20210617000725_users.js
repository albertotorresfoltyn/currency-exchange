exports.up = function (knex) {
  // eslint-disable-next-line prefer-arrow-callback
  return knex.schema.createTableIfNotExists("users", function (table) {
    table.increments();
    table.string("username").unique();
    table.string("password");
    table.string("firstName");
    table.string("lastName");
    table.timestamps();
  });
};

// eslint-disable-next-line no-unused-vars
exports.down = function (knex) {};
