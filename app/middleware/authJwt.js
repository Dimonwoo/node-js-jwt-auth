const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const {
  userUnauthorized,
  userForbidden,
  requiredRole,
} = require("../config/userMessagesConfig.js");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(userForbidden.CODE).send({
      message: userForbidden.MESSAGE,
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(userUnauthorized.CODE).send({
        message: userUnauthorized.MESSAGE,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === config.userRoles.ADMIN) {
          next();
          return;
        }
      }

      res.status(requiredRole.CODE).send({
        message: requiredRole.MESSAGE.replace("ROLE", config.userRoles.ADMIN),
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === config.userRoles.MODERATOR) {
          next();
          return;
        }
      }

      res.status(requiredRole.CODE).send({
        message: requiredRole.MESSAGE.replace(
          "ROLE",
          config.userRoles.MODERATOR
        ),
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === config.userRoles.MODERATOR) {
          next();
          return;
        }

        if (roles[i].name === config.userRoles.MODERATOR) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: requiredRole.MESSAGE.replace(
          "ROLE",
          `{config.userRoles.ADMIN} or {config.userRoles.MODERATOR}`
        ),
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
