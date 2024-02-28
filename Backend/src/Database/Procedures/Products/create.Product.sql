CREATE OR ALTER PROCEDURE createProduct(
    @productId VARCHAR(255),
    @productName VARCHAR(255),
    @descr TEXT,
    @productQuantity INT,
    @productPrice MONEY,
    @productCategory VARCHAR(255),
    @productImage VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Products(
    productId,
    productName,
    descr,
    productImage,
    productQuantity,
    productCategory,
    productPrice
    )
    VALUES(
    @productId,
    @productName,
    @descr,
    @productImage,
    @productQuantity,
    @productCategory,
    @productPrice
    )
END