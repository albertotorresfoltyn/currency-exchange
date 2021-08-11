/* eslint-disable prefer-arrow-callback */
exports.up = function (knex) {
  return knex.schema.createTable("countries", function (table) {
    table.increments();
    table.string("fullname").unique();
    table.integer("population");
    table.text("currencies");
    table.string("code");
    table.timestamps();
  });
};

// eslint-disable-next-line no-unused-vars
exports.down = function (knex) {};
