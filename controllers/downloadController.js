const request = require('request')
const fs = require('fs')
// get list of images from GCP storage bucket
// call GCP once for each image returning that image's URL

const downloadImages = (req, res) => {
    let getUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}`

    request(getUrl, (error, response, body) => {
        // body contains xml coming back from the api call.
        // Here we will use a regexp to match all filenames within the xml, then make a new api call for each to get the image url back.
        let imgArr = []
        const regexp = /<Key>(.*?)<\/Key>/g
        const matches = body.match(regexp)

        matches.forEach(x => {
            // extract the filename from the string in matches
            let regex = /<\/?Key>/g
            x = x.replace(regex, '')
                // call api for each image url and return it to the frontend
            let url = `https://storage.googleapis.com/storage/v1/b/${process.env.GCS_BUCKET}/o/${x}?alt=media`

            request(url, (error, response, body) => {
                // console.log(JSON.parse(body))
                // console.log(body)

                fs.writeFile('./client/public/images/' + x, body, 'utf8', err => err ? console.log(err) : console.log('success'))
            })
        })


        if (error) {
            console.log(error)
            throw new Error(error.message)
        } else if (body) {
            res.status(200).json(body)
        }
    })
}

module.exports = downloadImages