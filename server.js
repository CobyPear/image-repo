const express = require('express')
const path = require('path')
__dirname = path.resolve()
const request = require('request')
const multer = require('multer')
const multerGoogleStorage = require('multer-cloud-storage')

require('dotenv').config()

const upload = multer({ storage: multerGoogleStorage.storageEngine() })

const app = express()
const PORT = process.env.PORT || 8080

const corsOptions = {}

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

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(handleCors(corsOptions))

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static('client/public'))


// Upload an image
app.post('/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file selected, try again' })
        throw new Error('No file selected, try again')
    } else {
        console.log(req.files)
        res.json({ message: 'success', file: req.file })
    }
})

app.get('/api/images', (req, res) => {
    let getUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}`

    request(getUrl, (error, response, body) => {
        if (error) {
            console.log(error)
            throw new Error(error.message)
        } else if (body) {
            console.log(body)
            res.json(body)
        }
    })

})

app.listen(PORT, console.log(`Server is running on port ${PORT}`))