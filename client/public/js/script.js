const fileName = document.getElementById('file-selected')
const input = document.getElementById('file-upload')

const viewImages = async(e) => {
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
            img.dataset.zoom = false
            img.addEventListener('click', (e) => {
                if (e.target.dataset.zoom === 'false') {
                    e.target.dataset.zoom = true
                    img.style.width = 'auto'
                    img.style.height = 'auto'
                } else if (e.target.dataset.zoom === 'true') {
                    e.target.dataset.zoom = false
                    img.style.display = 'flex'
                    img.style.height = '250px'
                    img.style.width = '250px'
                    img.style['margin-right'] = 'auto'
                    img.style.padding = '25px'
                }

            })

            const downloadButton = document.createElement('button')
            downloadButton.classList = 'borderSpin'
            downloadButton.value = image.metadata.mediaLink
            downloadButton.textContent = `Download ${imageName}`
            downloadButton.addEventListener('click', (e) => {
                window.location.href = e.target.value
            })

            const container = document.createElement('div')
            container.className = 'image'

            container.append(img, downloadButton)

            const imgContainer = document.getElementById('imgContainer')
            imgContainer.append(container)
        })

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


input.addEventListener('change', (e) => {
    console.log('hello')
    console.log(e.target.value)
    console.log(e.target)
})
window.addEventListener('load', viewImages)