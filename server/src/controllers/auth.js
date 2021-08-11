const { BadRequest, Unauthorized, Forbidden } = require("../errors");
const db = require("../db");
const { isMatchPassword, generateJWTToken } = require("../lib/auth");

const findByUsername = async (username) => {
  const user = await db.select("users", {
    filteringConditions: [["username", "=", username]],
  });
  return user;
};

const login = async (body) => {
  if (!body.username || !body.password)
    throw new BadRequest("Username and Password are required.");
  const [user] = await findByUsername(body.username);
  if (!user) throw new Unauthorized();
  const match = await isMatchPassword(body.password, user.password);
  if (!match) throw new Unauthorized();
  const token = generateJWTToken(user.id);
  await db.insertOrUpdate(
    "auth",
    [
      {
        query: {
          token,
          userId: user.id,
        },
      },
    ],
    [{ propertyName: "userId" }]
  );
  delete user.password;
  delete user.created_at;
  delete user.updated_at;
  return {
    user,
    token,
  };
};

const getByIdAndToken = async (id, token) => {
  const [auth] = await db.select("auth", {
    filteringConditions: [["token", "=", token]],
  });
  if (!auth || auth.userId !== id) throw new Forbidden();
  return auth.userId;
};

module.exports = {
  login,
  getByIdAndToken,
};
