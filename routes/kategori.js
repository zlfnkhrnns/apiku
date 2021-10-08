const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "gambar") {
            cb(null, "assets/kategori");
          } else {
            cb(null, err);
          }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname);
          },
        }); 
const upload = multer({storage: storage});

router.get('/', controller.kategori.getAll);
router.get('/search', controller.kategori.getSearch);
router.post('/', upload.fields([{ name: 'gambar', maxCount:1}]), controller.kategori.post);
router.put('/:idKategori', controller.kategori.put);
router.delete('/:idKategori', controller.kategori.delete);

module.exports = router;