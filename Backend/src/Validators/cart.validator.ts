import joi from 'joi';

export const createCartSchema = joi.object({
    userId: joi.string().required(),
    date: joi.date().required(),
    products: joi.array().items(
        joi.object({
          productId: joi.string().required(),
          productName: joi.string().required(),
          productImage: joi.string().required(),
          productPrice: joi.number().required(),
          quantity: joi.number().required(),
        })
      ).required(),
})