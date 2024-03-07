import joi from "joi";
export const newOrderSchema = joi.object({
    orderId: joi.string().required(),
    cartId: joi.string().required(),
    userId: joi.string().required(),
    totalPrice: joi.number().required(),
    status: joi.string().required()
})