const db = require("../db/db.js");
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const fs = require('fs');
const formidable = require('formidable')

// creates new chef

exports.createChef = function(req, res) {

    //hashing the password
    const saltRounds= 10;
    const uncryptPass = req.body.password
    const hash =bcrypt.hashSync(uncryptPass, saltRounds)

    // create chef
    console.log('sasasasasasas')
	db.Chef.create({
		username:req.body.username,
		password:hash,
		location:req.body.location,
		phoneNumber:req.body.phoneNumber,
		description:req.body.description,
		rating:req.body.rating,
		imgUrl:req.body.imgUrl
	}).then(chef =>{
		res.send(chef)
	}).catch(err =>{
        console.log("Error is" , err)
    })
};

// gets the data for all the chefs

exports.retrieveAllChefs = function(req, res) {
	db.Chef.findAll().then(chefs =>{
		res.send(chefs)
	}).catch(err =>{
        console.log(err)
    })
};

// gets data for one chef
exports.retrieveOneChef = function(req, res) {
    db.Chef.findAll({
        where:{username:req.params.username}
    }).then(chef =>{
        res.send(chef)
    }).catch(err =>{
        console.log(err)
    })
	

};

// gets the chefs with specific location
exports.retrieveByLocation = function(req, res) {
    db.Chef.findAll({
        where:{location:req.params.location}
    }).then(chef=>{
        res.send(chef)
    }).catch(err =>{
        console.log(err)
    })
};

// updates Information for the cheif
exports.updateOne = function(req, res) {  //done
	db.Chef.update({
		username:req.body.username,
		password:req.body.password,
		location:req.body.location,
		phoneNumber:req.body.phoneNumber,
		description:req.body.description,
		rating:req.body.rating,
		imgUrl:req.body.imgUrl},{where:{username:req.params.username}}
		).then(()=>{
			res.send("updated successfully for this chef")
		}).catch(err =>{
            console.log(err)
        })
};

///////////////////////////////////////////////////
//mealsControllers

exports.createMeal = function(req, res) {
	console.log(req.params.username)
	db.Chef.findAll({
        where:{username:req.params.username}
    }).then(chef =>{
        chef[0].createMeal({
			name:req.body.name,
			description:req.body.description
		}).then(meal => {
			res.send(meal)
		})
    }).catch(err =>{
        console.log(err)
    })
};
exports.deleteMeal = function(req, res) {
	
	db.Chef.findAll({
        where:{username:req.params.username}
    }).then(chef =>{
		db.Meal.destroy({where:{name:req.body.name,chefId:chef[0].id}}).then(meal =>{
				res.send("deleted")
		})
    }).catch(err =>{
        console.log(err)
    })
};

// if the chef decides to delete his account
// for extra time
exports.deleteOneChef = function(req, res) { //done
	db.Chef.destroy({
		where:{username:req.params.username}
	}).then(()=>{
		res.send('deleted chef successfully')
	})
};

 exports.retrievemeals= function(req,res){ // retriev all meals of specific user
	db.Chef.findAll({
        where:{username:req.params.username}
    }).then(chef =>{
        chef[0].getMeals().then(meals => {
			res.send(meals)
		})
    }).catch(err =>{
        console.log(err)
    })

 }



 
// retrieve chefs by mealname
 exports.retrieveChefsByMeal= function(req,res){ 
	db.Chef.findAll({ include:
		[{ model: db.Meal,
			where: { name: {[Sequelize.Op.like]:"%"+req.params.mealName+"%" } 
		
		            }  
	                 }]
            }).then(chefs =>{ 
		            res.status(200)
		             res.send(chefs)}
		)
		.catch(console.error)
 }




 exports.saveimage= function(req,res){ // save images of the chef in directory "uploads using formidable lib."
  console.log(req.params.username)
	var filesNames=[];var i=0;
	var form =new formidable.IncomingForm().parse(req);

      form.on('fileBegin', (name, file) => {
          var path="frontend/images/";
		file.path = path+req.params.username+"."+file.name.split(".")[1];
		// console.log(__dirname);
      })

    .on('file', (name, file) => {
    //   console.log('Uploaded file',file.name,file.type,file.path)  
    })
    //...
 }



 exports.saveimagemeal= function(req,res){ // save images of the meals in directory "uploads using formidable lib."
  console.log(req.params.username)
  console.log(req.params.meal)
	var filesNames=[];var i=0;
	var form =new formidable.IncomingForm().parse(req);

      form.on('fileBegin', (name, file) => {
          var path="frontend/mealimages/";
		file.path = path+req.params.username+"-"+req.params.meal+"."+file.name.split(".")[1];
		// console.log(__dirname);
      })}