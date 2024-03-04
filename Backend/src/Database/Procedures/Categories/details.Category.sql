CREATE OR ALTER PROCEDURE getCategoryDetails(@categoryId VARCHAR(255))
AS
BEGIN
    SELECT * FROM Categories WHERE categoryId = @categoryId
END