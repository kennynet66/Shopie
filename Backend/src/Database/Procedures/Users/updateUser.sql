CREATE  or ALTER PROCEDURE updateUser(
    @userId VARCHAR(255),
    @firstName VARCHAR(255), 
    @lastName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255))
AS
BEGIN
    UPDATE Users SET 
        firstName = @firstname,
        lastName = @lastname, 
        email = @email, 
        password = @password
    WHERE userId = @userId
END