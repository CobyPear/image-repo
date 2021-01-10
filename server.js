const express = require('express')
const path = require('path')
__dirname = path.resolve()

const logger = require('morgan')

require('dotenv').config()


// the express app
const app = express()
const PORT = process.env.PORT || 8080

// cors options
const corsOptions = {}

// cors middlware function
const handleCors = options => {
    return (req, res, next) => {
        if (options) {
            res.set('Access-Control-Allow-Origin', '*')
        } else {
            res.set('Access-Control-Allow-Origin', '*')
        }
        next()
    }
}

// parser middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// cors middleware
app.use(handleCors(corsOptions))

// logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}
// frontend page
app.use(express.static('client/public'))


// upload route
const uploadFileRoute = require('./routes/uploadRoutes')
// download rotes
const downloadImagesRoute = require('./routes/downloadRoutes')


// Upload an image
app.use('/api', uploadFileRoute)
app.use('/api', downloadImagesRoute)


app.listen(PORT, console.log(`Server is running on port ${PORT}`))