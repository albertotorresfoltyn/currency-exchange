exports.up = function (knex) {
  // eslint-disable-next-line prefer-arrow-callback
  return knex.schema.createTableIfNotExists("auth", function (table) {
    table.increments();
    table.string("token");
    table
      .integer("userId")
      .unique()
      .unsigned()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps();
  });
};

// eslint-disable-next-line no-unused-vars
exports.down = function (knex) {};
