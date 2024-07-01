-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    -- You can add more columns as needed
);

-- Suppliers Table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_id INT REFERENCES contacts(id)
    -- You can add more columns as needed
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    model VARCHAR(255),
    sale_price DECIMAL(10, 2) NOT NULL,
    purchase_price DECIMAL(10, 2),
    stock_quantity INT NOT NULL DEFAULT 0,
    brand_id INT REFERENCES brands(id),
    supplier_id INT REFERENCES suppliers(id),
    category_id INT REFERENCES categories(id),
    acquisition_date DATE,
    status VARCHAR(50)
    -- You can add more columns as needed
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    celular VARCHAR(20),
    email VARCHAR(255),
    whatsapp VARCHAR(20)
    -- Puedes añadir más columnas según sea necesario
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    -- Puedes añadir más columnas aquí sea necesario
);