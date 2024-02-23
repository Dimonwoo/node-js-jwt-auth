module.exports = {
  startApi: { CODE: 200, MESSAGE: "Node JWT Auth Api" },
  userRegisteredSuccessfully: {
    CODE: 200,
    MESSAGE: "User registered successfully!",
  },
  invalidUsername: {
    CODE: 400,
    MESSAGE: "Failed! Username is already in use!",
  },
  invalidEmail: { CODE: 400, MESSAGE: "Failed! Email is already in use!" },
  invalidRole: { CODE: 400, MESSAGE: "Failed! Role does not exist" },
  userNotFound: { CODE: 404, MESSAGE: "User Not found." },
  ivalidPassword: { CODE: 401, MESSAGE: "Invalid Password!" },
  userUnauthorized: { CODE: 401, MESSAGE: "Unauthorized!" },
  userForbidden: { CODE: 403, MESSAGE: "No token provided!" },
  requiredRole: { CODE: 403, MESSAGE: "Require ROLE Role!" },
  internalServerError: { CODE: 500, MESSAGE: "Internal Server Error" },
};
