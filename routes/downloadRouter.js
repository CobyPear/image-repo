const express = require('express')
const router = express.Router()
const downloadImages = require('../controllers/downloadController')


router.route('/download')
    .get(downloadImages)

module.exports = router