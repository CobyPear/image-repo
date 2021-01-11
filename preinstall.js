const fs = require('fs')
require('dotenv').config()

const preinstall = () => {
    fs.writeFile('./google-credentials-heroku.json'), process.env.GOOGLE_CONFIG, (err) => err ? console.log(err) : console.log('key file built successfully!')
}

module.exports = preinstall