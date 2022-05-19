const Inventory = require('../models/Inventory')

exports.getAll = async (req, res, next) => {
    console.log("get all inventory")
    const [items, _] = await Inventory.findAll()
    console.log(items)
    res.json({items})
}

exports.add = async (req, res, next) => {
    console.log("add item")
    const {name, price, quantity, warehouseId} = req.body;
    if (!name || !price || !quantity || !warehouseId) {
        // handle error
        next()
    } else {
        const item = new Inventory(name, price, warehouseId, quantity)
        const [data, _] = await item.save()
        res.json({data})
    }
}

exports.update = async (req, res, next) => {
    console.log("update item")
    const {name, price, quantity, warehouseId} = req.body;
    if (!name || !price || !quantity || !warehouseId) {
        // handle error
        next()
    } else {
        const [data, _] = await Inventory.update(req.body)
        res.json({data})
    }
}

exports.delete = async (req, res, next) => {
    await Inventory.delete(req.params.id)
    res.json({message: "success"})
}
