const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/', (req, res) => {
    res.send('Hello')
})

router.post('/signup', (req, res) => {
    const {firstName, lastName, password, email, registerDate} = req.body

    if (!firstName || !lastName || !password || !email) {
        return res.status(422).json({error: 'Please fill all the fields!'})
    }

    User.findOne({email: email})
    .then((savedUser) => {

        if (savedUser) {
            return res.status(422).json({error: 'User already exists!'})
        }

        const user = new User({
            firstName,
            lastName,
            password,
            email
        })

        user.save()
        .then(user => {
            res.json({message: 'Successfully registered.'})
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router