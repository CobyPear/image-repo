// POST route for uploading an image to the Cloud bucket - uses multer and multer-cloud-storage
const uploadImage = async (req, res) => {
    // if the file was not uploaded, or no file was selected, send error message
    if (!req.file) {
        res.status(400).json({ message: 'No file selected, try again' })
        throw new Error('No file selected, try again')
    } else {
        res.status(200).json({ message: 'Success! Go back to view images' })
    }
}

module.exports = uploadImage