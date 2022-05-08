const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const config = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'public', 'images', 'uploads'),
        filename: (req, file, callback) => {
            const hash = crypto.randomBytes(8).toString('hex');
            const filename = `${hash}-${file.originalname}`
            callback(null, filename);
        }
    })
};

module.exports = config;