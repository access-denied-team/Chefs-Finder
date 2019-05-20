const Sequelize = require("sequelize");

// creates new connection
const sequelize = new Sequelize("CHEFINDER", "root", "12345678", {
  host: "localhost",
  dialect: "mysql"
});

 sequelize.authenticate()
 .then(() => console.log('Db Connected'))
 .catch(err => console.log('Error: ' + err)) // this is the same as sync but alot of people are using it instead of sync

// new schemas
const Chef = sequelize.define("chef", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }, // we can also use serial for id tpye, its basically an int that will auto increment
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  location: { type: Sequelize.STRING, required: true },
  phoneNumber: { type: Sequelize.INTEGER, required: true, unique: true },
  description: { type: Sequelize.STRING },
  rating: { type: Sequelize.INTEGER },
  imgUrl: { type: Sequelize.STRING }
});

const User = sequelize.define("user", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  location: { type: Sequelize.STRING, required: true }
});

const Meal = sequelize.define("meal", {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, required: true },
  description: { type: Sequelize.STRING }
});

Chef.hasMany(Meal);
Meal.belongsTo(Chef);

sequelize.sync();

module.exports.User = User;
module.exports.Chef = Chef;
module.exports.Meal = Meal;