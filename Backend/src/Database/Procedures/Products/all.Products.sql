CREATE OR ALTER PROCEDURE getAllProducts
AS
BEGIN
    SELECT *  FROM Categories as c
JOIN Products as p
    ON p.productCategory = c.categoryId
END