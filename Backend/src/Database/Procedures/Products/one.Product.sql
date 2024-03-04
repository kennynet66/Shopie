CREATE OR ALTER PROCEDURE getOneProduct(@productId VARCHAR(255))
AS
BEGIN
    SELECT *  FROM Categories as c
JOIN Products as p
ON p.productCategory = c.categoryId
WHERE p.productId = @productId
END