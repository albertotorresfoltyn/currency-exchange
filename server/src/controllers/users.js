const { BadRequest, NotFound } = require("../errors");
const db = require("../db");
const { hashPassword } = require("../lib/auth");

const findById = async (id) => {
  const user = await db.select("users", {
    filteringConditions: [["id", "=", id]],
  });
  return user;
};

const get = async () =>
  (await db.select("users")).map((e) => ({
    id: e.id,
    username: e.username,
    firstName: e.firstName,
    lastName: e.lastName,
  }));

const getById = async (id) => {
  if (!id) throw new BadRequest();
  const [user] = await findById(id);
  if (!user) throw new NotFound();
  delete user.password;
  delete user.created_at;
  delete user.updated_at;
  return user;
};

const create = async (body) => {
  // eslint-disable-next-line no-param-reassign
  body.password = await hashPassword(body.password);
  const [id] = await db.insert("users", {
    ...body,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const newUser = {
    ...body,
  };
  delete newUser.password;
  delete newUser.created_at;
  delete newUser.updated_at;
  return {
    id,
    ...newUser,
  };
};

const update = async (id, body, allowedProperties = undefined) => {
  if (!id) throw new BadRequest();
  const bodyPropertyNames = Object.keys(body);
  if (allowedProperties) {
    const isValidOperation = bodyPropertyNames.every((propertyName) =>
      allowedProperties.includes(propertyName)
    );
    if (!isValidOperation) throw new BadRequest();
  }

  const [user] = await findById(id);
  if (!user) throw new NotFound();
  delete user.id;
  delete user.created_at;

  // hash password
  // eslint-disable-next-line no-param-reassign
  body.password = await hashPassword(body.password);

  bodyPropertyNames.forEach(
    // eslint-disable-next-line no-return-assign
    (propertyName) => (user[propertyName] = body[propertyName])
  );
  user.updated_at = new Date();
  await db.update("users", {
    fields: user,
    filteringConditions: [["id", "=", id]],
  });
  // eslint-disable-next-line no-param-reassign
  delete body.password;
  delete user.password;
  delete user.created_at;
  delete user.updated_at;
  return { id, ...user, ...body };
};

const deleteById = async (id) => {
  if (!id) throw new BadRequest();
  const [user] = await findById(id);
  if (!user) throw new NotFound();
  db.remove("users", {
    filteringConditions: [["id", "=", user.id]],
  });
  delete user.password;
  delete user.created_at;
  delete user.updated_at;
  return user;
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteById,
};
