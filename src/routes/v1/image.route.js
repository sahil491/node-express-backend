const express = require('express');
const auth = require('../../middlewares/auth');
const imageController = require('../../controllers/image.controller')
const galleryupload = require('../../controllers/multipleImageUploads');
const router = express.Router();

router
.route('/:userId')
.get(auth(),imageController.getImage)
.post(auth(), galleryupload.array("imageFile"),imageController.createImage)
.delete(auth(), imageController.deleteImage)
router
.route('/:id')
.get(auth(),imageController.getImage)

router
.route('/:imageId')
.delete(auth(), imageController.deleteImage)

module.exports = router;