CREATE PROCEDURE createOrder(
    @orderId VARCHAR(255),
    @cartId VARCHAR(255),
    @userId VARCHAR(255),
    @totalPrice MONEY,
    @status VARCHAR(255)
)
AS
BEGIN
    INSERT INTO orders(orderId, cartId, userId, totalPrice, Status)
    VALUES (@orderId, @cartId, @userId, @totalPrice, @status);
END;
