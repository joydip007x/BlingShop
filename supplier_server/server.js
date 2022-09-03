const express= require('express');
const app= express();
const db=require('./db.js')

const OrderRoute = require('./routes/orderRoute.js')
const UserRoute= require('./routes/userRoute.js')

app.use(express.json());

app.get("/",(req,res)=>{
    res.send( "<div> <h2><b> &hearts is in SUPPPLY chain ;</b></h2></div>")
})

app.use('/supplyAPI/orders/',OrderRoute)
app.use('/supplyAPI/users/',UserRoute)

const port= process.env.port || 7000;

app.listen(port, ()=> 'Supply SERVER');