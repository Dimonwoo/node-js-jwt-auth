const {
  invalidRole,
  invalidUsername,
  invalidEmail,
} = require("../config/userMessagesConfig");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(invalidUsername.CODE).send({
        message: invalidUsername.MESSAGE,
      });
      return;
    }

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(invalidEmail.CODE).send({
          message: invalidEmail.MESSAGE,
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(invalidRole.CODE).send({
          message: `{invalidRole.MESSAGE} = {req.body.roles[i]}`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
