// middleware fofr file uploads 

const multer = require('multer');
const path = require('path');

// Storage options
const storage = multer.diskStorage({
    destination: './public/images', 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

//Initialising multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },  // limits the file size to 1MB
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only Images!');
        }
    }
});