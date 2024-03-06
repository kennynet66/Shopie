CREATE OR ALTER PROCEDURE createCategory(
    @categoryId VARCHAR(255),
    @categoryName VARCHAR(255),
    @categoryImage VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Categories(categoryId, categoryName, categoryImage)
    VALUES(@categoryId, @categoryName, @categoryImage)
END

SELECT * FROM Categories