const multer = require('multer');

module.exports = upload = multer({
  storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + file.originalname);
  }
})
});

return upload;