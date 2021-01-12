const form = document.getElementById('uploadForm')
const fileName = document.getElementById('file-selected')
const input = document.getElementById('file-upload')
const imageContainer = document.getElementById('imgContainer')
let profile

const viewImages = async() => {
    // e.preventDefault()
    try {
        if (!profile) return
        const response = await fetch('https://guarded-bayou-88466.herokuapp.com/api/download', {
            method: 'GET'
        })

        const images = await response.json()

        imageContainer.style.visibility = 'visible'
        form.style.visibility = 'visible'

        images.forEach(image => {
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


// from google client library docs - Google sign-in for Websites
function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // show images when user is signed in
    viewImages()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    form.style.visibility = 'hidden'
    imageContainer.style.visibility = 'hidden'

}