// const submitBtn = document.getElementById('submit')
// const formData = new FormData()
// const fileField = document.querySelector('input[type="file"]')
// const title = document.querySelector('input[type="text"]')

// submitBtn.addEventListener('click', async e => {
//     console.log('hello')
//     e.preventDefault()
//     console.log(title.value)
//     formData.append(title.value, fileField.files[0])
//     try {
//         const response = await fetch('http://localhost:8080/uploads', {
//             method: 'POST',
//             // cors: 'no-cors',
//             body: formData
//         })

//     } catch (error) {
//         console.log(error)
//         throw new Error(error.message)
//     }


// })

const showImg = document.getElementById('showimg')


showImg.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/api/images', {
            method: 'GET',
        })

        console.log(await response.json())

        const newImg = document.createElement('img')
        // newImg.src =

    } catch (error) {
        console.log(error)
        throw new Error('No images not found')
    }
})