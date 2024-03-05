CREATE  or ALTER PROCEDURE updateCart(
    @id VARCHAR(255),
    @userId VARCHAR(255),
    @date DATETIME,
    @products TEXT
) AS 
BEGIN 
UPDATE cart SET
    id = @id,
    userId = @userId,
    "date" = @date,
    products = @products
    WHERE 
    id = @id
END

