CREATE OR ALTER PROCEDURE deleteProduct(
    @productId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM Products WHERE productId = @productId
END