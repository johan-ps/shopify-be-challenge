const express = require('express');
const inventoryController = require('../controllers/inventory');
const router = express.Router();

router.get('/', inventoryController.getAll);
router.post('/add', inventoryController.add)
router.put('/:id/update', inventoryController.update)
router.delete('/:id/delete', inventoryController.delete)

module.exports = router
