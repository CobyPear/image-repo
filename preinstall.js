const fs = require('fs')
require('dotenv').config()

module.exports = fs.writeFile('./google-credentials-heroku.json', process.env.GOOGLE_CONFIG, (err) => err ? console.log(err) : console.log('key file built successfully!'))

