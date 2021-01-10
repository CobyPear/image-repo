const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucket = storage.bucket('shopify-img-repo')

const downloadImages = (req, res) => {
    bucket.getFiles((err, files) => {
        if (!err) {
            res.status(200).json(files)
        } else {
            console.log(err)
            res.status(500).json(err)
            throw new Error('Error getting files')
        }
    })
}

module.exports = downloadImages