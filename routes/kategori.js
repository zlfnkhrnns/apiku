const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./assets/gambar');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '--' + file.originalname);
    }
});
const upload = multer({storage: storage});

router.get('/', controller.kategori.getAll);
router.get('/search', controller.kategori.getSearch);
router.post('/', upload.single('gambar'), controller.kategori.post);
router.put('/:nama', controller.kategori.put);
router.delete('/:nama', controller.kategori.delete);

module.exports = router;