const express = require('express')
const path = require('path')
__dirname = path.resolve()


require('dotenv').config()


// the express app
const app = express()
const PORT = process.env.PORT || 8080

// a function that validates origin of request and checks it against the allow list
const createAllowListValidator = function (allowList) {
    return function (val) {
        for (let i = 0; i < allowList.length; i++) {
            if (val === allowList[i]) {
                return true
            }
        }
        return false
    }
}
const allowList = ['https://guarded-bayou-88466.herokuapp.com/', 'http://localhost:8080', null]
// cors options
const corsOptions = {
    allowOrigin: createAllowListValidator(allowList)
}
// cors middleware function
const handleCors = (options) => {
    return (req, res, next) => {
        if (options.allowOrigin) { 
            let origin = req.headers['origin']
            if (options.allowOrigin(origin)) {
                res.set('Access-Control-Allow-Origin', origin)
            } else {
                res.set('Access-Control-Allow-Origin', '*')
            }
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
    const logger = require('morgan')
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