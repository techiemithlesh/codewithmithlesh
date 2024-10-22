const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("codewithmithlesh", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to  database:", err);
  });

module.exports = sequelize;
