module.exports = {
  secret: process.env.AUTH_SECRET_KEY,
  userRoles: { ADMIN: "admin", MODERATOR: "moderator" },
};
