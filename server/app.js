const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 4000
const { MONGOURI } = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', () => {
    console.log('Error while connecting to MongoDB')
})

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT)
})