const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Product = mongoose.model('Product')

router.get('/allproducts', (req, res) => {
    Product.find()
    .populate('commentedBy','_id firstName')
    .populate('comments.commentedBy', '_id firstName')
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

router.put('/comment', requireLogin, (req, res) => {

    const comment = {
        text: req.body.text,
        commentedBy: req.user._id
    }

    Product.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    })
    .populate('comments.commentedBy', '_id firstName')
    .populate('commentedBy', '_id firstName')
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        else {
            res.json(result)
        }
    })
})

router.delete('/deleteproduct/:productId', requireLogin, (req, res) => {
    Product.findOne({_id: req.params.productId})
    .exec((err, product) => {
        if (err || !product) {
            return res.status(422).json({error: err})
        }
    //     if (product.createdBy._id.toString() === req.user._id.toString()) {
            product.remove()
            .then(result => {
                res.json({message: 'Successfully deleted.'})
            })
            .catch(err => {
                console.log(err)
            })
    //     }
    })
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