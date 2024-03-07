/* 
    @ createProduct - This is afunction that gets the details of a product and stores them in the DB
    @ getAllProducts - Queries the database and returns all the available products
    @ getOneProduct - Gets the details of one product from the db using it's id
    @ deleteProduct - Deletes the product from the db using it's id
    @ getCategoryProducts - Gets all products in a certain category by the category id
 */

import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { v4 } from "uuid";
import { newProductSchema, updateProductSchema } from "../Validators/product.validator";
import { Product } from "../Interfaces/product.Interface";

export const createProduct = (async (req: Request, res: Response) => {
    try {
        // get the request body
        const product: Product = req.body
        // Generate a unique id for each product
        const productId = v4();
        // Validate the data using joi
        const { error } = newProductSchema.validate(req.body);

        if(error){
            return res.json({
                error: error.details[0].message
            })
        } else {
            // Create a pool connection
        const pool = await mssql.connect(sqlConfig)
        // Check if the pool connection was made
        if (pool.connected) {
            // Send the data to the database
            const result = (await pool.request()
                .input('productId', mssql.VarChar, productId)
                .input('productName', mssql.VarChar, product.productName)
                .input('descr', mssql.VarChar, product.descr)
                .input('productQuantity', mssql.Int, product.productQuantity)
                .input('productImage', mssql.VarChar, product.productImage)
                .input('productCategory', mssql.VarChar, product.productCategory)
                .input('productPrice', mssql.Money, product.productPrice)
                .execute('createProduct')
            ).rowsAffected
            
            // Get and act according to the result
            if(result[0] > 0){
                res.status(201).json({
                    success: "Product created successfully"
                })
            } else {
                res.status(201).json({
                    error: "Problem while creating the product"
                })
            }
        } else {
            // Return an error if there was an issue when creating the connection
            return res.status(500).json({
                error: "Could not create pool connection"
            })
        }
        }
        
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

export const getAllProducts = (async (req: Request, res: Response) =>{
    // Create a pool connection
    const pool = await mssql.connect(sqlConfig);
    // Check if the pool onnection has been made
    if(pool.connected){
        // Query the db for all the products
        const products = (await pool.request()
        .execute('getAllProducts')
        ).recordset
        if(products.length >= 1){
            res.status(200).json({
                products
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

export const getOneProduct = (async (req: Request, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);
        if(pool.connected){
            // Get the product Id from the req params
            const productId = req.params.productId
            
            const products = (await pool.request()
            
            .input('productId', mssql.VarChar, productId)
            .execute('getOneProduct')
            ).recordset

            // Verify if it found the product with the provided id
            if(products.length >= 1) {
                res.status(200).json({
                    products
                })
            } else {
                res.status(201).json({
                    error: "Could not find the product"
                })
            }
        }else {
            // Return an error if there was an issue when creating the connection
            return res.status(500).json({
                error: "Could not create pool connection"
            });
        }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

export const deleteProduct = (async (req: Request, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);
        if(pool.connected){
            // Get the product id from the params
            const productId = req.params.productId;

            const result = (await pool.request()
            .input('productId', mssql.VarChar, productId)
            .execute('deleteProduct')
            ).rowsAffected

            if(result[0] > 0){
                return res.status(200).json({
                    success: "Product deleted"
                })
            } 

        } else {
            // Return an error if there was an issue when creating the connection
            return res.status(500).json({
                error: "Could not create pool connection"
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})
export const getCategoryProducts = (async(req: Request, res: Response)=>{
    try {
        // Get the id from the params
        const categoryId: string = req.params.categoryId
        // Create a pool connection
        const pool = await mssql.connect(sqlConfig);
        // Query the db to get all the products that match the category id
        const products = (await pool.request()
        .input('categoryId', mssql.VarChar(), categoryId)
        .execute('getCategoryProducts')
        ).recordset

        if(products.length >= 1){
            res.status(200).json({
                products
            })
        } else {
            res.status(201).json({
                error: "No products in this category"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

export const updateProduct = (async(req: Request, res: Response) =>{
    try {
        // get the request body
        const product: Product = req.body;

        const {error} = updateProductSchema.validate(req.body);

        if (error){
            res.status(201).json({
                error: error.details[0].message
            })
        } else {
                    // Get the product Id from the request params
        const productId: string = req.params.productId;

        const pool = await mssql.connect(sqlConfig);

        const result = (await pool.request()
        .input('productId', mssql.VarChar, productId)
        .input('productName', mssql.VarChar, product.productName)
        .input('descr', mssql.VarChar, product.descr)
        .input('productQuantity', mssql.Int, product.productQuantity)
        .input('productImage', mssql.VarChar, product.productImage)
        .input('productCategory', mssql.VarChar, product.productCategory)
        .input('productPrice', mssql.Money, product.productPrice)
        .execute('updateProduct')
        ).rowsAffected

        if(result[0] >= 1){
            return res.status(200).json({
                success: "Product updated successfully"
            })
        } else {
            return res.status(201).json({
                error: "Error updating product"
            })
        }
        }

    }catch(error){
        return res.status(500).json({
            error
        })
    }
})