const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const Router= require("./router");
// const bcrypt = require('../node_modules/bcrypt-nodejs');
const { HTTP_UNAUTHORIZED, HTTP_SERVER_ERROR } = require('../constants.js')
const db = require("./db/db");
const secret = require('../secret.js')
const bcrypt = require("bcrypt")

//express app
const app = express();
const port = process.env.PORT || 3030;

////////////////////////////////////////////////////////
app.use(express.static("client"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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

  res.send('index.html')

});
 
app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.Chef.findOne({where: { username: username }}).then(function(chef){
    if(!chef) {
     return  res.status(HTTP_UNAUTHORIZED).send('Username Incorrect')
    }
    const currentPass = chef.password;
    bcrypt.compare(password, currentPass).then((matching) => {
      if(matching){
        console.log('LoggedIn')
        return res.redirect('/'+username);  
      }else{
       return res.status(HTTP_UNAUTHORIZED).send('Password Incorrect')
      }
    })
  })
})


//router
app.use("/",Router.router)




app.listen(port, () => {
  console.log(`Conneceted to port ${port}`);
});

