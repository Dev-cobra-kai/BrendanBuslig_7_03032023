// Importer multer pour charger des images
const multer = require('multer');

// Differents formats d'images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// app.post('/api/posts', upload.single('imageUrl'), (req, res, next) => {
//     // do something with the uploaded image
//     // ...
//   })

module.exports = multer({ storage }).single('image');
