import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { v4 } from "uuid";
import { newCategorySchema } from "../Validators/category.validator";
import { Category } from "../interface/category.Interface";

export const createCategory = (async (req: Request, res: Response) => {
    try {
        // Generate a unique id for 
        const categoryId: string = v4();
        // Get the category data from the req.body
        const categoryDetails: Category = req.body
        // Verify the data using joi
        let { error } = newCategorySchema.validate(categoryDetails)
        if(error){
            return res.status(202).json({
                error: error.details[0].message
            })
        } else{
            // Create a pool connection
        const pool = await mssql.connect(sqlConfig);

            const result = (await pool.request()
                .input('categoryId', mssql.VarChar, categoryId)
                .input('categoryName', mssql.VarChar, categoryDetails.categoryName)
                .execute('createCategory')
            ).rowsAffected

            if (result[0] > 0) {
                res.status(200).json({
                    success: "Category created successfuly"
                })
            } else {
                res.status(201).json({
                    error: "Could not create category"
                })
            }

        
        }
        
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

export const getAllCategories = (async (req: Request, res: Response) => {
    // Create a pool connection
    const pool = await mssql.connect(sqlConfig)
        // Query the db for all categories
        const categories = (await pool.request()
        .execute('getAllCategories')).recordset

        // if(categories.length >=1){
            res.status(200).json({
                success: "Found some categories",
                categories: categories
            })
        // } else {
        //     res.status(201).json({
        //         error: "No products available"
        //     })
        // }
    }
)