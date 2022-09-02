const express = require('express');
const router = express.Router();
const Product= require('../models/productModel')

router.get('/getAllProducts', async(req, res) => {

       try {
           const products= await Product.find();
           res.send(products)
       } catch (error) {
           res.send(error)
       }
});


router.post('/addNewProduct', async (req, res) => {

    const {name,image,varients,prices} = req.body
    const newProduct =  new Product({name,varients,prices,image})

    console.log( newProduct , " NEW PROD ")
    try {
        newProduct.save()   ;
        res.send('Product Information saved successfully')
    } catch (error) {
        return res.status(400).json({ message:error});
    }

});
module.exports = router;