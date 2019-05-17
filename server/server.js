const express = require("express");
const exphbs = require("express-handlebars"); 
const { HTTP_UNAUTHORIZED } = require('../constants.js');
const bcrypt = require('bcrypt-nodejs')
const { Chef } = require('../server/db/db.js');
const bodyParser = express.json();
const path = require('path');
const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.send('Testing')
});
 
app.post('/login', function(req, res){
  var username = req.params.username;
  var password = req.params.password;

  Chef.findOne({where: { username: username }}).then(function(chef){
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

app.listen(port, () => {
  console.log(`Conneceted to port ${port}`);
});

