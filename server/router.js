const router= require("express").Router()
const chefControllers = require("./Controllers/chefControllers")

//routes 
router.route("/signup").post((req,res)=>{
    chefControllers.createChef(req,res)
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




module.exports.router=router