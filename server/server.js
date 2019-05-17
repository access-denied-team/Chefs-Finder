const express = require("express");
const bodyParser = require("body-parser");
const router= require("./router")

//express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
app.use("/",router)


app.get("/",(req,res) =>{
res.send("Hello!")
})

app.listen(port, () => {
  console.log("server is Running");
});
