const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller');

router.get('/', controller.indeks.getAll);
router.get('/search', controller.indeks.getSearch);
router.post('/', controller.indeks.post);
router.put('/:no', controller.indeks.put);
router.delete('/:no', controller.indeks.delete);

module.exports = router;