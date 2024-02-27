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
    productCategory VARCHAR(255) NOT NULL,
    CONSTRAINT FK_Products  FOREIGN KEY (productCategory)
    REFERENCES Categories(categoryId),
 )

