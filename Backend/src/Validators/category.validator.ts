import joi from 'joi'

export const newCategorySchema = joi.object({
    categoryName: joi.string().required(),
    categoryImage: joi.string().required()
})
