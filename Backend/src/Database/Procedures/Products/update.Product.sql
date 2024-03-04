CREATE OR ALTER PROCEDURE updateProduct(
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
    UPDATE Products
    SET
    productName = @productName,
    descr = @descr,
    productQuantity = @productQuantity,
    productPrice = @productPrice,
    productImage = @productImage,
    productCategory = @productCategory
    WHERE productId = @productId
END

SELECT * FROM Products