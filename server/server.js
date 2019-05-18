const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const Router= require("./router");
// const bcrypt = require('../node_modules/bcrypt-nodejs');
const { HTTP_UNAUTHORIZED, HTTP_SERVER_ERROR } = require('../constants.js')
const db = require("./db/db");
const secret = require('../secret.js')

//express app
const app = express();
const port = process.env.PORT || 3030;


//authentication function
const authenticate = function(req, res, next){
  const authToken = req.headers['authentication-token'];
  if(!authToken){
    return res.status(HTTP_UNAUTHORIZED).send('Username or Password Incorrect');
  }
  jwt.verify(authToken, secret, function(err, decodedToken){
    if(err){
      return res.status(HTTP_UNAUTHORIZED).send('Incoorect Username or Passowrd');
    }
    const username = decodeToken.username;
    Chef.findOne({where: {username: username}}).then(function(chef){
      if(!chef){
        return res.status(HTTP_UNAUTHORIZED).send('Please sign up')
      }
      req.body.chef = chef;
      return next();
    }).catch(function(err){
      return res.status(HTTP_SERVER_ERROR).sed(err);
    })
  })
}

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
    const currentPass = chef.password;
    bcrypt.compare(password, currentPass).then((matching) => {
      if(matching){
        console.log('LoggedIn')
        return res.redirect('/');  
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

