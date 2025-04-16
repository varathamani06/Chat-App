const express=require("express");
const router =express.Router();

router.get("/",(req,res)=>{
   res.send("server is running port 5000!")
})

module.exports = router;