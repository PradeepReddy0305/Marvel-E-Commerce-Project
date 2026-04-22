create database MarvelStoreDB;
use marvelstoredb;


-- Category 1: Clothes
CREATE TABLE marvel_clothes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500)
);

-- Category 2: Magnets
CREATE TABLE marvel_magnets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500)
);

-- Category 3: Keychains
CREATE TABLE marvel_keychains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500)
);

-- Category 4: Action Figures
CREATE TABLE marvel_action_figures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500)
);

-- Category 5: Tools
CREATE TABLE marvel_tools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500)
);