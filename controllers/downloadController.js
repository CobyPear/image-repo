const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucket = storage.bucket('shopify-image-repo')

const downloadImages = (req, res) => {
    
    bucket.getFiles((err, files) => {
        if (!err) {
            console.log(files)
            res.status(200).json(files)
        } else {
            console.log(err)
            res.status(res.statusCode).json(err)
            throw new Error('Error getting files')
        }
    })
}

module.exports = downloadImages