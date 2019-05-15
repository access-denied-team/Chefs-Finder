// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("chefinder", "root", "1111", {
//   host: "localhost",
//   dialect: "mysql"
// });

// // sequelize.sync({ force: false, logging: false }).then(() => {
// //   console.log("databases created");
// // });

// // const User = sequelize.define("user"  , {
// //   id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
// //   username: { type: Sequelize.STRING, required: true, unique: true },
// //   password: { type: Sequelize.STRING, required: true }
// // });

// class User extends Sequelize.Model {}
// User.init(
//   {
//     username: Sequelize.STRING,
//     birthday: Sequelize.DATE
//   },
//   { sequelize, modelName: "user" }
// );

// sequelize
//   .sync()
//   .then(() =>
//     User.create({
//       username: "janedoe",
//       birthday: new Date(1980, 6, 20)
//     })
//   )
//   .then(jane => {
//     console.log("odayn connected");
//   });

// // sequelize
// //   .authenticate()
// //   .then(() => {
// //     console.log("Connection has been established successfully.");
// //   })
// //   .catch(err => {
// //     console.error("Unable to connect to the database:", err);
// //   });
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

class User extends Sequelize.Model {}
User.init(
  {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  },
  { sequelize, modelName: "user" }
);

sequelize
  .sync()
  .then(() =>
    User.create({
      username: "janedoe",
      birthday: new Date(1980, 6, 20)
    })
  )
  .then(jane => {
    console.log("connecdted");
  });
