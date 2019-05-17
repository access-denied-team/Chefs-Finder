const express = require("express");
const { HTTP_UNAUTHORIZED } = require('../constants.js');
const { Chef } = require('../server/db/db.js');
const bodyParser = express.json();
const app = express();
const port = 8080;

app.use(bodyParser);

app.post('/login', function(req, res){
  var username = req.params.username;
  var password = req.params.password;

  Chef.findOne({where: { username: username }}).then(function(chef){
    if(!chef) {
      res.status(HTTP_UNAUTHORIZED).send('Username or Password Incorrect')
    }
  })
})

app.listen(port, () => {
  console.log("Conneceted to port " + port);
});

