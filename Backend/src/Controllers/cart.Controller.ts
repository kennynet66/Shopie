import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { cart } from '../Interfaces/cart.interface';
import { sqlConfig } from "../Config/sql.config";
import { createCartSchema } from '../Validators/cart.validator';

// export const createCart = async (req: Request, res: Response) => {
//     try {
//         const { userId, date, products }: cart = req.body;     

//         let validationResult = createCartSchema.validate(req.body);
//         let error: any = validationResult.error;

//         if (error) {
//             return res.json({
//                 error: error.details[0].message
//             });
//         }

//         const pool = await mssql.connect(sqlConfig);

//         const existingCart: { id: string, products: string }[] = await (await pool.request()
//             .input("userId", mssql.VarChar, userId)
//             .execute('getUserCart')).recordset;
            
//         if (existingCart.length > 0) {
//             const id: string = existingCart[0].id;

//             const updatedProducts = JSON.parse(existingCart[0].products);
//             updatedProducts.push(...products);

//             let updateResult = await (await pool.request()
//                 .input("id", mssql.VarChar, id)
//                 .input("userId", mssql.VarChar, userId)
//                 .input("date", mssql.DateTime, date || new Date())
//                 .input("products", mssql.NVarChar, JSON.stringify(updatedProducts))
//                 .execute('updateCart'));

//             if (updateResult.rowsAffected && updateResult.rowsAffected[0] > 0) {
//                 return res.status(200).json({ success: true, message: 'Product added to existing cart successfully' });
//             } else {
//                 return res.status(500).json({ error: 'Failed to update existing cart' });
//             }
//         } else {
//             const id = v4();
//             let result = await (await pool.request()
//                 .input("id", mssql.VarChar, id)
//                 .input("userId", mssql.VarChar, userId)
//                 .input("date", mssql.DateTime, date)
//                 .input("products", mssql.NVarChar, JSON.stringify(products))
//                 .execute('createCart'));

//             if (result.rowsAffected && result.rowsAffected[0] > 0) {
//                 return res.status(201).json({ success: true, message: 'New cart created successfully' });
//             } else {
//                 return res.status(500).json({ error: 'Failed to create new cart' });
//             }
//         }
//     } catch (error) {
//         return res.status(500).json({error});
//     }
// };

export const createCart = async (req: Request, res: Response) => {
    try {
      const { userId, date, products }: cart = req.body;
  
      let validationResult = createCartSchema.validate(req.body);
      let error: any = validationResult.error;
  
      if (error) {
        return res.json({
          error: error.details[0].message
        });
      }
  
      const pool = await mssql.connect(sqlConfig);
  
      const existingCart: { id: string, products: string }[] = await (await pool.request()
        .input("userId", mssql.VarChar, userId)
        .execute('getUserCart')).recordset;
  
      if (existingCart.length > 0) {
        const id: string = existingCart[0].id;
        
        const currentProducts = JSON.parse(existingCart[0].products);
  
        const productExists = products.some((product: any) => {
          return currentProducts.some((currentProduct: any) => currentProduct.productId === product.productId);
        });
  
        if (productExists) {
          return res.status(400).json({ error: 'Product already exists in the cart.' });
        }
  
        currentProducts.push(...products);
  
        
        let updateResult = await (await pool.request()
          .input("id", mssql.VarChar, id)
          .input("userId", mssql.VarChar, userId)
          .input("date", mssql.DateTime, date || new Date())
          .input("products", mssql.NVarChar, JSON.stringify(currentProducts))
          .execute('updateCart'));
  
        if (updateResult.rowsAffected && updateResult.rowsAffected[0] > 0) {
          return res.status(200).json({ success: true, message: 'Product added to existing cart successfully' });
        } else {
          return res.status(500).json({ error: 'Failed to update existing cart' });
        }
      } else {
        const id = v4();
        let result = await (await pool.request()
          .input("id", mssql.VarChar, id)
          .input("userId", mssql.VarChar, userId)
          .input("date", mssql.DateTime, date)
          .input("products", mssql.NVarChar, JSON.stringify(products))
          .execute('createCart'));
  
        if (result.rowsAffected && result.rowsAffected[0] > 0) {
          return res.status(201).json({ success: true, message: 'New cart created successfully' });
        } else {
          return res.status(500).json({ error: 'Failed to create a new cart' });
        }
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  


export const getAllUsersCarts =  async(req: Request, res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig);
        let allcarts = (await pool.request().execute('getAllUsersCarts')).recordset

        return res.json({
            carts: allcarts
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getUserCart = async(req: Request, res:Response)=>{
    try {
        const userId = req.params.userId
        console.log('Fetching cart for userId:', userId);

        const pool = await mssql.connect(sqlConfig)

        let cart = (await pool.request().input("userId", userId).execute('getUserCart')).recordset

        console.log('Fetched cart:', cart);

        return res.json({
            cart
        })
    } catch (error) {
        return res.json({error})
    }
}

export const updateCart = async(req:Request, res: Response)=>{
    try {
        const id = req.params.id

        const {userId, date, products}:cart = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("id", mssql.VarChar, id)
        .input("userId", mssql.VarChar, userId)
        .input("date", mssql.DateTime, date)
        .input("products", mssql.Text, products)
        .execute('updateCart')).rowsAffected

        console.log(result);
        

        return res.status(200).json({
            message: "Cart updated successfully"
        })
    } catch (error) {
        return res.json({error})
    }
}

export const deleteCart = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("id", mssql.VarChar, id)
        .execute('deleteCart')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.status(201).json({
                error: "Cart not found"
            })
        }else{
            return res.status(200).json({
                message: "Cart deleted successfully"
            })
        }   
    } catch (error) {
        return res.json({error})
    }
}