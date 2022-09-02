const express= require('express')
const router= express.Router();

const uid = require('../models/userIDModel');

router.post("/register",async(req,res)=>{

    const {bankUID ,email, password} = req.body
    const newUser = new uid({bankUID,email,password})

    try{
        newUser.save();
        res.send('User Registered successfully')
    }
    catch(error){
        return res.status(400).json({ message:error});
    }
});
router.get("/getUID",async(req,res)=>{

    const email = req.query.user;
    // console.log( req.query.user)
    // console.log(" BEFORE EMAIL request : ",email);

    try{
        result= await uid.findOne({'email':email});
        res.send(result)
    }
    catch(error){
        return res.status(400).json({ message:error});
    }
});

router.post("/updateAdminBalance",async(req,res)=>{

    const {email,amount}= req.body;
    console.log( "OK OK ",email)
    console.log( "OK OK ",amount)

    try {
        res= await uid.updateOne(
            { 'email' : email },
            { $inc: { 'bdt': -amount } }
        );
        res=await uid.updateOne(
            { 'email' : 'supply@example.com' },{ $inc: { 'bdt': amount } }
            );
    } catch (error) {
        
    }

})

router.post("/updateBalance",async(req,res)=>{

    const {email,amount}= req.body;
    // console.log( "OK OK ",email)
    // console.log( "OK OK ",amount)

    try {
        res= await uid.updateOne(
            { 'email' : email },
            { $inc: { 'bdt': -amount } }
        );
        res=await uid.updateOne(
            { 'email' : 'admin@example.com' },{ $inc: { 'bdt': amount } }
            );
    } catch (error) {
        
    }

})

router.get("/login",async(req,res)=>{

    const allx = req.query.user;
    //{"email":"12@1","password":"123"}
    const email= allx.split(',')[0].split(':')[1].slice(1,-1);
    const pass= allx.split(',')[1].split(':')[1].slice(1,-1);
    console.log( req.query.user + '\n email= '+email+'#' + pass )
    try{
        result= await uid.findOne({'email':email},{'password':pass})
        
        const yy=result.data;
      
        res.send(result)
    }
    catch(error){
        return res.status(400).json({ message:error});
    }
});

router.get("/findbyUid",async(req,res)=>{

    const allx = req.query.user;
    console.log( req.query.user + '\n ' )
    try{
        result= await uid.findById(allx);
        console.log("FINDBYid"+result)
        res.send(result)
    }
    catch(error){
        return res.status(400).json({ message:error});
    }
});


module.exports = router;