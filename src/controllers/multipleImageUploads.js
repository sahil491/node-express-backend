
const multer = require('multer');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const multerStorage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const multerFilter = (req,file,cb) =>{
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
      } else {
        cb(new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, "Only .png, .jpg and .jpeg format allowed!"),false);
      }
}

const galleryupload = multer({
    storage : multerStorage,
    fileFilter : multerFilter
})

module.exports = galleryupload;