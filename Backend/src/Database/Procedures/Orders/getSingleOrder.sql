CREATE OR ALTER PROCEDURE getSingleOrder(
    @ordedId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM orders
    WHERE ordedId = @ordedId;
END;