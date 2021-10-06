const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    if(file.fieldname === "rekaman") {
        cb(null, "assets/rekaman");
      } else {
        cb(null, "assets/foto");
      }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
      },
    }); 
const upload = multer({storage: storage});

router.get('/', controller.lis.getAll);
router.get('/search', controller.lis.getSearch);
router.post('/', upload.fields([{ name: 'rekaman', maxCount:1}, {name: 'foto', maxCount: 1}]), controller.lis.post);
router.put('/:judulSejarah', controller.lis.put);
router.delete('/:judulSejarah', controller.lis.delete);

module.exports = router;