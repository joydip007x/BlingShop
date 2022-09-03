const mongoose= require('mongoose')

const userSchema= mongoose.Schema({

    name :{ type:String, require},
    email :{ type:String, require},
    password :{ type:String, require},
    bdt : {type: Number,default:100000000},
    isAdmin: {type:Boolean , require, default:false},
})

module.exports=mongoose.model('users',userSchema);