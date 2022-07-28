const httpStatus = require('http-status');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service')

const createImage = async (userid, files) => {

    const result = files.map(item => {
        const { filename: image } = item;

        return {
            name: item.originalname,
            Gallery: {
                filename: image,
                path: item.path,
            },
            UserID: userid
        }

    })
    const response = await Image.create(result)
    return response
}
const getImage = async (userid) => {

    const a = await Image.find({ UserID: userid })
    return a;

}

const getImageById = async (userid) => {
    return Image.findById(userid)
};


const deleteImage = async (userId, imageId) => {

    const image = await Image.findOne({ _id: imageId, UserID: userId })
    if (!image) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
    }
    await image.remove()
    userService.deleteFile(image.Gallery.path)
    return image;

};

module.exports = {
    createImage,
    getImage,
    deleteImage
}