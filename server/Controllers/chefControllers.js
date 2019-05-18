const db = require("../db/db.js");

// creates new chef
exports.createChef = function(req, res) { //done
	db.Chef.create({
		username:req.body.username,
		password:req.body.password,
		location:req.body.location,
		phoneNumber:req.body.phoneNumber,
		description:req.body.description,
		rating:req.body.rating,
		imgUrl:req.body.imgUrl
	}).then(chef =>{
		res.send(chef)
	})
};

// gets the data for all the chefs
exports.retrieveAllChefs = function(req, res) { //done
	db.Chef.findAll().then(chef =>{
		res.send(chef)
	})
};

// gets data for one chef
exports.retrieveOneChef = function(req, res) { //done
	db.Chef.findAll({
		where:{username:req.params.username}
	}).then(chef =>{
		res.send(chef)
	})

};

// gets the chefs with specific location
exports.retrieveByLocation = function(req, res) {};

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
		})
};

///////////////////////////////////////////////////
//mealsControllers

exports.createMeal = function(req, res) {};
exports.deleteMeal = function(req, res) {
	db.Meal.destroy({
		where:{name:req.params.username}
	}).then(()=>{
		res.send('deleted meal successfully')
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
