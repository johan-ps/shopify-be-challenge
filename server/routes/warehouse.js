const express = require('express');
const warehouseController = require('../controllers/warehouse');
const router = express.Router();

router.get('/', warehouseController.getAll);
router.post('/add', warehouseController.add)

module.exports = router
