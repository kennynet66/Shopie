import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { v4 } from "uuid";
import { Category } from "../Interface/category.Interface";
import { newCategorySchema } from "../Validators/category.validator";

export const createCategory = (async (req: Request, res: Response) => {
    try {
        // Generate a unique id for 
        const categoryId: string = v4();
        // Get the category data from the req.body
        const categoryDetails: Category = req.body
        // Verify the data using joi
        let { error } = newCategorySchema.validate(categoryDetails)
        if(error){
            return res.json({
                error: error.details[0].message
            })
        } else{
            // Create a pool connection
        const pool = await mssql.connect(sqlConfig);
        // Check if pool connection was created
        if (pool.connected) {

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

        } else {
            res.status(500).json({
                error: "Could not create pool connection"
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
    // check if the pool connection has been made
    if (pool.connected) {
        // Query the db for all categories
        const categories = (await pool.request()
        .query('SELECT * FROM Categories')
        ).recordset

        if(categories.length >=1){
            res.status(200).json({
                categories
            })
        } else {
            res.status(201).json({
                error: "No products available"
            })
        }
    } else {
        res.status(500).json({
            error: "Could not create pool connection"
        })
    }
})