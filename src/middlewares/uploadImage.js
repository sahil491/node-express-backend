const httpStatus = require('http-status');
let multer = require('multer');

const ApiError = require('../utils/ApiError');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'ImageUploads/');
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + file.originalname;
      cb(null, fileName)
      console.log("fileName", fileName)
    }
  });

  const filter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, "Only .png, .jpg and .jpeg format allowed!"),false);
    }
  };

  var upload = multer({
    storage: storage,
    fileFilter : filter
  })

  module.exports = upload;