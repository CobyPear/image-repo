const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerGoogleStorage = require('multer-cloud-storage')

const uploadImage = require('../controllers/uploadController')


const upload = multer({ storage: multerGoogleStorage.storageEngine() })

router.route('/upload')
    .post(upload.single('file'), uploadImage)

module.exports = router