const Warehouse = require('../models/Warehouse')

exports.getAll = async (req, res, next) => {
    console.log("get all warehouse")
    const [warehouses, _] = await Warehouse.findAll()
    console.log(warehouses)
    res.json({warehouses})
}

exports.add = async (req, res, next) => {
    console.log("add warehouse")
    const {name, location} = req.body;
    if (!name || !location) {
        // handle error
        next()
    } else {
        const warehouse = new Warehouse(name, location)
        const [data, _] = await warehouse.save()
        res.json({data})
    }
}
