const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Product = mongoose.model('Product')

router.get('/allproducts', (req, res) => {
    Product.find()
    //.populate('postedBy', '_id name')
    .then(products => {
        res.json({products})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createproduct', requireLogin, (req, res) => {
    const {title, price, description, category, image} = req.body

    if (!title || !price || !description || !category || !image) {
        //return to stop further execution
        return res.status(422).json({error: 'Please fill all the fields!'})
    }

    req.user.password = undefined

    const product = new Product({
        title,
        price,
        description,
        category,
        image
    })

    product.save().then(result => { res.json({ product: result }) }).catch(err => console.log(err))
})

// router.get('/myproducts', requireLogin, (req, res) => {
//     Product.find({postedBy: req.user._id})
//     .populate('postedBy', '_id name')
//     .then(mypost => {
//         res.json({mypost})
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

module.exports = router