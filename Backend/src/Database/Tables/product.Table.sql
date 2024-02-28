/* 
    The products table should contain:-
    1. Product id as the primary Key.
    2. Product Name.
    3. Product description
    4. Product quantity
    5. Product category
    6. Product price
 */

 CREATE TABLE Products(
    productId VARCHAR(255) PRIMARY KEY,
    productName VARCHAR(255),
    descr TEXT,
    productQuantity INT,
    productPrice MONEY,
    productImage VARCHAR(255),
    productCategory VARCHAR(255) NOT NULL,
    CONSTRAINT FK_Products_category  FOREIGN KEY (productCategory)
    REFERENCES Categories(categoryId),
 )

ALTER TABLE Products ADD productImage VARCHAR(255)