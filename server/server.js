const express = require("express");
const bodyParser = require("body-parser");
const Router= require("./router")
const db= require("./db/db")

//express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
app.use("/",Router.router)


app.get("/",(req,res) =>{
res.send("Hello!")
})

app.listen(port, () => {
  console.log("server is Running");
});
