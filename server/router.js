const router= require("express").Router()
const chefControllers = require("./Controllers/chefControllers")
const Chef= require("./db/db")

//routes 
router.route("/signup").post((req,res)=>{
    chefControllers.createChef(req,res)
})


router.route("/login").post((req,res)=>{
    
})


router.route("/all").get((req,res)=>{
    chefControllers.retrieveAllChefs(req,res)
})

router.route("/:username")
.get((req,res) => {
    chefControllers.retrieveOneChef(req,res)
})
.put((req,res)=>{
    chefControllers.updateOne(req,res);
})
.delete((req,res)=>{
    chefControllers.deleteOneChef(req,res)
})

router.route("/:location").get((req,res) => {
    chefControllers.retrieveByLocation(req,res)
})

// meal routes
router.route("/:username/meal").post((req,res)=>{
    chefControllers.createMeal(req,res)
}).delete((req,res)=>{
    chefControllers.deleteMeal(req,res)
})







module.exports.router=router