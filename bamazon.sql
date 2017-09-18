DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES (" Shaped Cushion Plush Round Pillow ", "Home", 18.99, 300),
  ("Black T-Rex Dinosaur Crew Socks", "Clothing", 10.00, 28),
  ("DESK DONUT Push Pin Holder", "Crafts", 12.50, 67), 
  ("Pusheen Cat Face Backpack ", "Bags", 43.99, 150),
  ("Umbra FishHotel Mini Aquarium", "Pets", 35.75, 700),
  ("Creative Chicken Leg Pillow Cotton Stuffed Cushion", "Home", 4.00, 69),
  ("All My Friends Are Dead", "Books", 10.00, 769),
  ("Rick and Morty Total Rickall Cooperative Card Game", "Games", 11.00, 11),
  ("Funko POP Movies: Harry Potter - Severus Snape", "Toys", 15.68, 210),
  ("Squatty Potty The Original Bathroom Toilet Stool 7", "Bath", 24.99, 320),

SELECT * FROM products;