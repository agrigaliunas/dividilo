
const {uploadImageToCloudinary} = require('./ImageService')

const uploadImage = async (imageBuffer) => {
    try {
        const response = await uploadImageToCloudinary(imageBuffer);
        console.log(response)
    } catch (error) {
        throw new Error('Error al subir imagen. Intente nuevamente');
    }

}


module.exports = {
    uploadImage
}