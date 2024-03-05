CREATE TABLE cart (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    date DATETIME,
    products TEXT,
    isPaid BIT DEFAULT 0
);

-- SELECT * FROM cart

-- ALTER TABLE cart
-- ALTER COLUMN products NVARCHAR(MAX);

-- DELETE FROM cart WHERE id ='d94eaad7-ba18-4222-b676-2d325f2f2ad6'
-- DELETE FROM cart
-- ALTER TABLE cart
-- ADD isPaid BIT DEFAULT 0;



