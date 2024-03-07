import joi from 'joi';

export const newProductSchema = joi.object({
    productName: joi.string().required(),
    descr: joi.string().required(),
    productQuantity: joi.number().required(),
    productImage: joi.string().required(),
    productCategory: joi.string().required(),
    productPrice: joi.number().required(),
})

export const updateProductSchema = joi.object({
    productName: joi.string().required(),
    descr: joi.string().required(),
    productQuantity: joi.number().required(),
    productImage: joi.string().required(),
    productCategory: joi.string().required(),
    productPrice: joi.number().required(),
})