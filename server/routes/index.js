const express = require('express');
const router = express.Router();

const inventoryRouter = require("./inventory")
const warehouseRouter = require("./warehouse")

router.use('/inventory', inventoryRouter)
router.use('/warehouse', warehouseRouter)

module.exports = router
