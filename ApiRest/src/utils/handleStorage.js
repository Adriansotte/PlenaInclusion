const multer = require("multer");
require("dotenv").config();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Donde guardar los archovos
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        // se reemplaza si tiene el mismo nombre
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename)
    }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
