CREATE TABLE Users(
    userId VARCHAR(255) PRIMARY KEY NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255), 
    isAdmin VARCHAR(255),
    isDeleted VARCHAR(255)
)

