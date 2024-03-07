CREATE TABLE 
orders(orderId VARCHAR(255), cartId VARCHAR(255), 
userId VARCHAR(255), totalPrice MONEY, "Status"  VARCHAR(255) 
CHECK ("Status" in ('Pending', 'Approved', 'InTransit', 'Completed')))

-- SELECT * FROM orders

-- DROP TABLE orders