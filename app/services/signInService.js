const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
  userNotFound,
  invalidPassword,
  internalServerError,
  userRegisteredSuccessfully,
} = require("../config/userMessagesConfig");
const { HS256, ONE_DAY } = require("../config/jwtConfig");

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(userNotFound.CODE)
          .send({ message: userNotFound.MESSAGE });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(invalidPassword.CODE).send({
          accessToken: null,
          message: invalidPassword.MESSAGE,
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: HS256,
        allowInsecureKeySizes: true,
        expiresIn: ONE_DAY,
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(userRegisteredSuccessfully.CODE).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(internalServerError.CODE).send({ message: err.message });
    });
};
