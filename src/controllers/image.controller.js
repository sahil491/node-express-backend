const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { imageService } = require('../services');
const userService = require('../services/user.service')
const { Image } = require('../models');
const sharp = require("sharp")
const path = require("path")
const createImage = catchAsync(async (req, res) => {


  req.files.map((item => {
    const { filename: image } = item;
    const sharp1 = sharp(item.path).resize(200, 200).toFile('uploads/' + 'thumbnails-' + item.originalname)
  }))
 

  const response = await imageService.createImage(req.user._id, req.files)
  res.status(201).json({
    message: response
  });

})

const getImage = catchAsync(async (req, res) => {
  const image = await imageService.getImage(req.user._id)

  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(image);
});


const getImageById = catchAsync(async (req, res) => {
  const image = await imageService.getImageById(req.user._id);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(image);
});


const deleteImage = catchAsync(async (req, res) => {

  await imageService.deleteImage(req.user._id, req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createImage,
  getImage,
  deleteImage,
  getImageById
}