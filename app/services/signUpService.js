const {
  userRegisteredSuccessfully,
  internalServerError,
} = require("../config/userMessagesConfig");
const db = require("../models");
const User = db.user;

const Role = db.role;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: userRegisteredSuccessfully });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: userRegisteredSuccessfully });
        });
      }
    })
    .catch((err) => {
      res.status(internalServerError.CODE).send({ message: err.message });
    });
};
