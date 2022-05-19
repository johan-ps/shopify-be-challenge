const db = require("../config/db");

class Warehouse {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    save() {
        const sql = `
            INSERT INTO WAREHOUSES (
                name,
                location
            )
            VALUES (?, ?);
        `;

        return db.execute(sql, [this.name, this.location])


    }

    static findAll() {
        const sql = `
            SELECT
                id, name, location
            FROM WAREHOUSES as w
            ORDER BY name
        `;

        return db.execute(sql);
    }
}

module.exports = Warehouse
