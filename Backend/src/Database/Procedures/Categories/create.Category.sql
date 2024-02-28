CREATE OR ALTER PROCEDURE createCategory(
    @categoryId VARCHAR(255),
    @categoryName VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Categories(categoryId, categoryName)
    VALUES(@categoryId, @categoryName)
END

SELECT * FROM Categories