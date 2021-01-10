const uploadedImage = document.getElementById('uploadedImg')
const image = uploadedImage.files[0]
const uploadFrom = document.getElementById('uploadForm')

const viewImages = async (e) => {
    try {
        const response = await fetch('http://localhost:8080/api/download', {
            method: 'GET'
        })
        console.log(await response.json())
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


document.addEventListener('load', viewImages)