const Sequelize = require("sequelize");
const sequelize = new Sequelize("chefinder", "root", "1111", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.sync({ force: false, logging: false }).then(() => {
  console.log("databases created");
});

const User = sequelize.define("user", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true }
});

//shareef
//oday3
//abu fares22