CREATE OR ALTER PROCEDURE createCart (
    @id VARCHAR(255), 
    @userId VARCHAR(255),
    @date DATETIME,
    @products NVARCHAR(MAX) 
)
AS
BEGIN
    INSERT INTO cart(id, userId, "date", products)
    VALUES(@id, @userId, @date, @products)
END


