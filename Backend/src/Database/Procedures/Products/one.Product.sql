CREATE OR ALTER PROCEDURE getOneProduct(@productId VARCHAR(255))
AS
BEGIN
    SELECT * FROM Products
    WHERE productId = @productId
END