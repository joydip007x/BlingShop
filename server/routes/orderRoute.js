const express = require('express');
const router=   express.Router();
const { v4 : uuidv4 } = require ('uuid');
const stripe= require('stripe')("sk_test_51LJdoPD9PVEyJI4UG6pWSfWFiqXj4DgcaeCT4YygOkGlEQFCy6aUYo2iI515eshplbFjqNAb07XXa1h2W3Jy2ljH00ZTSvLIxM");

const Order = require("../models/orderModel")

router.post('/placeOrder', async(req, res)=> { 

    const {order}= req.body;
    
    try {
        
         const newOrder= new Order(order)
         console.log("BACKEND ORDER ",newOrder, " \n ",order);
         newOrder.save();
         res.send('Payment Completed')

    } catch (error) {
          res.status(400).json({ status: 'error',message: error});
          return
    }
})


router.get('/getuserorders', async(req, res) => {

    const userid = req.query.userid;
    console.log( "orderRoute ", userid );

    try {
        const orders = await Order.find({'userid': userid})
        console.log( "orders OBEJCT = ", orders );
        res.send(orders)

    } catch (error) {
        
        return res.status(400).json({message: error})
    }

})

router.get('/getAllOrders', async(req, res) => {

    try {
        const orders = await Order.find()
        res.send(orders)
    } catch (error) {
        return res.status(400).json({message: error})
    }

})

router.post("/VerifyAOrder",async(req, res) => {

    const orderid= req.body.orderid;
    console.log("OK Id = "+ orderid);
    try {
        
         const res=await Order.findByIdAndUpdate({_id:orderid},{updatedAt:"abcd",isDelivered:1}).exec();
         console.log(res)

    } catch (error) {

         return res.status(400).json({message: error})
    }

})

module.exports= router