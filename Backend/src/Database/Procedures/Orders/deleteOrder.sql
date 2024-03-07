CREATE OR ALTER PROCEDURE 
deleteOrder ( @ordedId VARCHAR(255))
as BEGIN
DELETE FROM orders WHERE orderId = @orderId
END