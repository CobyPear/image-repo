const uploadedImage = document.getElementById('uploadedImg')
const image = uploadedImage.files[0]
const uploadFrom = document.getElementById('uploadForm')

const viewImages = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:8080/api/download', {
            method: 'GET'
        })

        const images = await response.json()
        console.log(images)

        images.forEach(image => {
            console.log(image)
            const matches = image.metadata.mediaLink.match(/\/o\/(.+)\?/)
            const imageName = matches[1]

            const img = document.createElement('img')
            img.src = `https://storage.googleapis.com/${image.bucket.name}/${imageName}`
            img.alt = image.id

            const imgContainer = document.getElementById('imgContainer')

            imgContainer.append(img)
            
        })
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


window.addEventListener('load', viewImages)