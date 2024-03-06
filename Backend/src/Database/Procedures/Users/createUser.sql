CREATE OR ALTER PROCEDURE createUser(
    @userId VARCHAR(255),
    @firstName VARCHAR(255),
    @lastName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users(userId, firstName, lastName, email, password)
    VALUES(@userId, @firstName, @lastName, @email, @password)
END

SELECT * FROM Users