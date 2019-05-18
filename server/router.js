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

<<<<<<< HEAD
router.route("/location/:location").get((req,res) => {
=======
router.route("/:location").get((req,res) => {
>>>>>>> 251b1f65956bb2b3580d1a97bba17f5fc6474221
    chefControllers.retrieveByLocation(req,res)
})

// meal routes
router.route("/:username/meal").post((req,res)=>{
    chefControllers.createMeal(req,res)
}).delete((req,res)=>{
    chefControllers.deleteMeal(req,res)
})







module.exports.router=router