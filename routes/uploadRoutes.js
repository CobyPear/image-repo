const express = require('express')
const router = express.Router()
const uploadImage = require('../controllers/uploadController')


router.route('/upload')
    .post(uploadImage)

module.exports = router