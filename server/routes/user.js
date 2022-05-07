const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model('User')

router.get('/allusers', (req, res) => {
    User.find()//One({email: email})
    //.populate('postedBy', '_id name')
    .then(users => {
        res.json({users})
    })
    .catch(err => {
        console.log(err)
    })
})