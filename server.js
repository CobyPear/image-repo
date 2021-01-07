const express = require('express')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads'})
__dirname = path.resolve()

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

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static('client/public'))

// app.get('',(req, res) => res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html')))

app.post('/uploads', upload.single('file'), (req, res) => {
    console.log(req.file)

    // const { name, filename } = req.body
    // console.log(name)
    // console.log(filename)
    // console.log(req)

    res.json({ message: 'success'})
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`))

