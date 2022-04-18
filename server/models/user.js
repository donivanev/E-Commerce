const mongoose = require('mongoose')
//const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        //required: [true, 'Please enter a valid password'],
        //minlength: [6, 'Minimum password length must be 6 characters']
    },
    email: {
        type: String,
        required: true
        //unique: true,
        //lowercase: true,
        //validate: [isEmail, 'Please enter a valid email']
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('User', UserSchema)