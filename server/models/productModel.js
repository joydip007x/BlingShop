const   mongoose  = require("mongoose")

const productSchema = mongoose.Schema({

    name : { type: String },
    varients :[],
    prices : [],
    image :{ type: String},
});

const productModel= mongoose.model('products', productSchema)

module.exports = productModel;