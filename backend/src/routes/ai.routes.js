const express=require("express")
const router=express.Router()
const aiControllers=require("../controllers/ai.controllers")

router.post('/get-review',aiControllers.getRes)
router.post('/get-time',aiControllers.getTime)
router.post('/get-space',aiControllers.getSpace)

module.exports=router