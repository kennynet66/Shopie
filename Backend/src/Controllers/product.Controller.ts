/* 
    @ createProduct - This is afunction that gets the details of a product and stores them in the DB
    @ getAllProducts - Queries the database and returns all the available products
    @ getOneProduct - Gets the details of one product from the db using it's id
    @ deleteProduct - Deletes the product from the db using it's id
 */

import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { Product } from "../Interface/product.Interface";
import { v4 } from "uuid";

export const createProduct = (async (req: Request, res: Response) => {
    try {
        // Create a pool connection
        const pool = await mssql.connect(sqlConfig)
        // Check if the pool connection was made
        if (pool.connected) {
            // get the request body
            const product: Product = req.body
            console.log(product);
            // Generate a unique id for each product
            const productId = v4();
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
        .query('SELECT * FROM Products')
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
            const product = (await pool.request()
            .input('productId', mssql.VarChar, productId)
            .execute('getOneProduct')
            ).recordset

            // Verify if it found the product with the provided id
            if(product.length >= 1) {
                res.status(200).json({
                    product
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
        res.status(500).json({
            error
        })
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
