const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller');

router.get('/', controller.indeks.getAll);
router.get('/search', controller.indeks.getSearch);
router.post('/', controller.indeks.post);
router.put('/:topik', controller.indeks.put);
router.delete('/:topik', controller.indeks.delete);

module.exports = router;