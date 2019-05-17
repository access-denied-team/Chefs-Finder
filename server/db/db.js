const Sequelize = require("sequelize");

const sequelize = new Sequelize("chefinder", "shareef", "1111", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.sync({ force: true, logging: true }).then(() => { //logging false would prevent outpitting SQL to the console on exection. Log true to see what you get!
  console.log("databases created");
});

const User = sequelize.define("user", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true }
});


