-- Active: 1689100983376@@127.0.0.1@3306
CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users (name, email, password, created_at)
VALUES 
('Rafael', 'campinas2@email.com', 'jsfwf2gw', DATETIME ('now'));


CREATE TABLE purchases (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    buyer_id INTEGER NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO purchases (buyer_id, total_price, created_at)
VALUES 
(1, 33, DATETIME ('now'));


CREATE TABLE purchases_products (
    purchase_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    FOREIGN KEY (product_id) REFERENCES products (id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
(2, 2, 3);


CREATE TABLE products (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL
);

INSERT INTO products (name, price, description, image_url)
VALUES ( 'Guia dos Mochileiros das Galáxias', 39.9, 'Um dos maiores clássicos da literatura de ficção científica.', 'www.imagem.com');
