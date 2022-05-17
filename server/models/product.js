const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    comments: [{
        text: String,
        commentedBy: {type: ObjectId, ref: 'User'}
    }],
    commentedBy: {
        type: ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        ref: 'User'
    }
})

mongoose.model('Product', ProductSchema)