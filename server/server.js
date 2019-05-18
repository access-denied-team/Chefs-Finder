const express = require("express");

const bodyParser = require("body-parser");
const Router= require("./router")
const db= require("./db/db")

//express app
const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser);

app.get('/', (req, res) => {
  res.send('Testing')
});
 
app.post('/login', function(req, res){
  var username = req.params.username;
  var password = req.params.password;

  db.Chef.findOne({where: { username: username }}).then(function(chef){
    if(!chef) {
      res.status(HTTP_UNAUTHORIZED).send('Username Incorrect')
    }
    const exsistingPassword = chef.password;
    bcrypt.compare(exsistingPassword, password).then((matching) => {
      if(matching){
        console.log('LoggedIn')
        return res.send('/');  
      }else{
       return res.status(HTTP_UNAUTHORIZED).send('Password Incorrect')
      }
    })
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
app.use("/",Router.router)


app.get("/",(req,res) =>{
res.send("Hello!")
})

app.listen(port, () => {
  console.log(`Conneceted to port ${port}`);
});

