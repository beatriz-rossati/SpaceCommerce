-- Active: 1689100983376@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES 
('u004', 'Rafael Sampaio', 'campinas@email.com', 'jsfwfgw', DATETIME ('now'));

SELECT * FROM users;

SELECT * FROM users
WHERE name LIKE '%sampaio%';

DELETE FROM users
WHERE id = 'u001'; 


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES ('p006', 'Poliana', 43, 'Livro Bonitinho', 'imagem.com');

--update um produto inteiro
UPDATE products 
SET 
    name = 'Cansei',
    price = 1000,
    description = 'sem criatividade agora',
    image_url = 'joga no google'
WHERE id = 'p002';

--update um campo do produto
UPDATE products
SET price = 29.99
WHERE id = 'p003';

SELECT * FROM products;

SELECT * FROM products
WHERE name LIKE '%guia%';

DELETE FROM products
WHERE id = 'p001'; 