const db = require('../config/db');

class Inventory {
    constructor(name, price, warehouseId, quantity) {
        this.name = name;
        this.price = price;
        this.warehouseId = warehouseId;
        this.quantity = quantity;
    }

    async save() {
        const sql = `
            INSERT INTO ITEMS (
                name,
                price
            )
            VALUES (?, ?);
        `;

        const [data, _] = await db.execute(sql, [this.name, this.price])

        const sql2 = `
            INSERT INTO INVENTORY (
                item_id,
                warehouse_id,
                quantity
            )
            VALUES (?, ?, ?)
        `;

        return db.execute(sql2, [data.insertId, this.warehouseId, this.quantity])

    }

    static update(data) {
        const sql = `
            UPDATE ITEMS
            SET name = '${ data.name }', price = '${ data.price }'
            WHERE id = ${ data.id };
        `;

        const sql2 = `
            UPDATE INVENTORY
            SET warehouse_id = '${ data.warehouseId }', quantity = '${ data.quantity }'
            WHERE item_id = ${data.id}
        `;

        return Promise.all([db.execute(sql), db.execute(sql2)]);
    }

    static delete(id) {
        const sql = `
            DELETE
            FROM INVENTORY
            WHERE item_id = ${id};
        `;

        const sql2 = `
            DELETE
            FROM ITEMS
            WHERE id = ${id};
        `;

        return Promise.all([db.execute(sql), db.execute(sql2)]);
    }

    static findAll() {
        const sql = `
            SELECT
                i.id, i.name, price, w.name as warehouse, w.id as warehouseId, inv.quantity
            FROM INVENTORY as inv
            INNER JOIN ITEMS as i ON i.id = inv.item_id
            INNER JOIN WAREHOUSES as w ON w.id = inv.warehouse_id
            ORDER BY i.name;
        `;

        return db.execute(sql);
    }
}

module.exports = Inventory
