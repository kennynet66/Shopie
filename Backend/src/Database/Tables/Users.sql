CREATE TABLE Users(
    userId VARCHAR(255) PRIMARY KEY NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255), 
    isAdmin VARCHAR(255),
    isDeleted VARCHAR(255)
)

-- SELECT * FROM Users
-- UPDATE Users SET isAdmin = 1 WHERE firstName = 'kings'



-- ALTER TABLE Users
-- ALTER COLUMN isDeleted BIT
-- ALTER COLUMN isDeleted BIT DEFAULT 0;

