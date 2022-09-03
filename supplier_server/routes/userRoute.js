const express= require('express')
const router= express.Router();

const User = require('../models/userModel');

router.post("/login",async(req,res)=>{

    const {email,password}= req.body
    console.log( " BACK SUPLLU : ", email, password);
    try{
        const user= await User.find({email,password})
        if(user.length){
           /// res.send("User login Successfull");

            const CurrentUser={
                name:user[0].name,
                password:user[0].password,
                email:user[0].email,
                bdt:user[0].bdt,
                isAdmin : user[0].isAdmin,
                _id: user[0]._id,
            }
            
            res.send(CurrentUser);
        }
        else{
            res.status(400).json({message:"You failed to login"});
        }
    }
    catch(error){
        res.status(400).json(error);
    }
});



router.post("/updateAdminBalance",async(req,res)=>{

    const {email,amount}= req.body;
    console.log( "OK OK ",email)
    console.log( "OK OK ",amount)

    try {
        res= await User.updateOne(
            { 'email' : email },
            { $inc: { 'bdt': -amount } }
        );
        res=await User.updateOne(
            { 'email' : 'supply@example.com' },{ $inc: { 'bdt': amount } }
            );
    } catch (error) {
        
    }

})

router.post("/updateBalance",async(req,res)=>{

    const {email,amount}= req.body;
     console.log( "OK OK ",email)
     console.log( "OK OK ",amount)

    try {
        res= await User.updateOne(
            { 'email' : email },
            { $inc: { 'bdt': -amount } }
        );
        res=await User.updateOne(
            { 'email' : 'admin@admin.com' },{ $inc: { 'bdt': amount } }
            );
    } catch (error) {
        
    }

})


module.exports = router
