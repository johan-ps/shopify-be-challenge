CREATE TABLE heroku_bcabd5952108b8e.items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    price DECIMAL NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX ID_UNIQUE(id ASC));

CREATE TABLE heroku_bcabd5952108b8e.warehouses (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NULL,
    location VARCHAR(45) NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX ID_UNIQUE(id ASC));

CREATE TABLE heroku_bcabd5952108b8e.inventory (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(item_id) REFERENCES ITEMS(id),
    FOREIGN KEY(warehouse_id) REFERENCES WAREHOUSES(id),
    UNIQUE INDEX ID_UNIQUE(id ASC));


