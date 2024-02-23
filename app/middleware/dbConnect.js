const db = require("../models");
const Role = db.role;

module.exports = () => {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      initial();
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
