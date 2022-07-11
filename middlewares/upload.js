require('dotenv').config();
const util = require('util');
const multer = require('multer');
const maxSize = process.env.APP_FILE_MAX_SIZE;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/resources/static/assets/uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split('.')[0] + '_' + Date.now() + '.' + file.originalname.split('.')[1];
    cb(null, fileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
