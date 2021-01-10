

const uploadImage = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file selected, try again' })
        throw new Error('No file selected, try again')
    } else {
        console.log(req.files)
        res.status(200).json({ message: 'Success! Go back to view images' })
    }
}

module.exports = uploadImage