CREATE TABLE Users(
    userId VARCHAR(255) PRIMARY KEY NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255), 
    isAdmin BIT DEFAULT 0,
    isDeleted BIT DEFAULT 0
)

DROP TABLE Users

-- SELECT * FROM Users

-- ALTER TABLE Users SET isAdmin = 1 WHERE firstName = "duncan"



-- ALTER TABLE Users
-- ALTER COLUMN isDeleted BIT
-- ALTER COLUMN isDeleted BIT DEFAULT 0;

