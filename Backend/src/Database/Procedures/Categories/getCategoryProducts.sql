CREATE OR ALTER PROCEDURE getCategoryProducts
    @categoryId VARCHAR(255)
AS
BEGIN
    SELECT p.productId, p.productName, p.descr, p.productQuantity, p.productPrice, p.productImage
    FROM Products AS p
    WHERE p.productCategory = @categoryId;
END;
