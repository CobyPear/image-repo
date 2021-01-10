const express = require('express')
const path = require('path')
__dirname = path.resolve()

const multer = require('multer')
const multerGoogleStorage = require('multer-cloud-storage')

require('dotenv').config()

const upload = multer({ storage: multerGoogleStorage.storageEngine() })

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

// frontend page
app.use(express.static('client/public'))


// upload route
const uploadFileRoute = require('./routes/uploadRoutes')


// Upload an image
app.use('/api/upload', upload.single('file'), uploadFileRoute)


app.listen(PORT, console.log(`Server is running on port ${PORT}`))