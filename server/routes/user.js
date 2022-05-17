const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model('User')

// router.get('/users', (req, res) => {
//     User.find()//One({email: email})
//     //.populate('postedBy', '_id name')
//     .then(users => {
//         res.json({users})
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({_id: req.params.id})
    .select('-password')
    .then(user => {
        res.json({user})
    })
    .catch(err => {
        return res.status(404).json({error: 'User not found!'})
    })
})

router.put('/updateavatar', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: {avatar: req.body.avatar}
    }, {new: true}, (err, result) => {
        if (err) {
            return res.status(422).json({error: 'Can\'t change avatar.'})
        }

        res.json(result)
    })
})

module.exports = router