const Sequelize = require("sequelize");

// creates new connection
const sequelize = new Sequelize("chefinder", "root", "1111", {
  host: "localhost",
  dialect: "mysql"
});
// yasser ma b3raf
sequelize.sync({ force: true, logging: true }).then(() => {
  console.log("databases created");
});

// new schemas
const Chef = sequelize.define("chef", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  location: { type: Sequelize.STRING, required: true },
  phoneNumber: { type: Sequelize.INTEGER, required: true, unique: true },
  description: { type: Sequelize.STRING },
  rating: { type: Sequelize.INTEGER }
});

const User = sequelize.define("user", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  location: { type: Sequelize.STRING, required: true }
});

const Meal = sequelize.define("meal", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  description: { type: Sequelize.STRING }
});

Chef.belongsToMany(Meal, {
  through: "cookTable"
});
Meal.belongsToMany(Chef, {
  through: "cookTable"
});

module.exports.User = User;
module.exports.Meal = Meal;
module.exports.Chef = Chef;
