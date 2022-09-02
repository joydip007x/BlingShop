const mongoose =require('mongoose')

var mongoURL = "mongodb+srv://1234:1234@cluster0.tbcpstk.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect( mongoURL,{useUnifiedTopology:true, useNewUrlParser:true})

var db=mongoose.connection


db.on('connected', ()=>{ console.log("Connection established ");})
db.on('error', ()=>{console.log("FAILED")})

module.exports = mongoose