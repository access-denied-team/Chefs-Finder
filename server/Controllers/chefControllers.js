const db = require("../db/db.js");
const bcrypt = require('bcrypt');

// creates new chef

exports.createChef = function(req, res) {

    //hashing the password
    const saltRounds= 10;
    const uncryptPass = req.body.password
    const hash =bcrypt.hashSync(uncryptPass, saltRounds)

    // create chef

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
        chef[0].removeMeal({
		where:{	name:req.body.name}
		}).then(meal => {
			res.send(meal)
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
