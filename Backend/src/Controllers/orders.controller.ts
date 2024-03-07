import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { v4 } from "uuid";
import { newOrderSchema } from "../Validators/order.validator"
import { Order} from "../Interfaces/orders.interface";

export const createOrder =  (async (req:Request, res: Response) => {
    try {
        const orderId = v4()

        const{cartId, userId, totalPrice, status}: Order = req.body

        const {error} = newOrderSchema.validate(req.body)

        if(error){
            return res.status(400).json({
                error: error
            })
        } else{
            const pool = await mssql.connect (sqlConfig)

            if(pool.connected){
                const result = (await pool.request()
                .input('orderId', mssql.VarChar, orderId)
                .input('cartId', mssql.VarChar, cartId)
                .input('userId', mssql.VarChar, userId)
                .input('totalPrice', mssql.Money, totalPrice)
                .input('status', mssql.Money, status)
                .execute('createOrder')
                ).rowsAffected
            }
        }
    } catch (error) {
        return res.status(500).json({error: error})
    }
})

export const getAllOrders =  async(req: Request, res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig);
        let allusers = (await pool.request().execute('getAllOrders')).recordset

        return res.status(200).json({
            users: allusers
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getSingleOrder= async(req: Request, res:Response)=>{
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let order = (await pool.request().input("ordedId", id).execute('getSingleOrder')).recordset

        return res.json({
            order
        })
    } catch (error) {
        return res.json({error})
    }
}

export const updateOrder = async(req:Request, res: Response)=>{
    try {
        const orderId = req.params.id

        const {cartId, userId, totalPrice, status}:Order = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
            .input('orderId', mssql.VarChar, orderId)
            .input('cartId', mssql.VarChar, cartId)
            .input('userId', mssql.VarChar, userId)
            .input('totalPrice', mssql.Money, totalPrice)
            .input('status', mssql.Money, status)
            .execute('updateOrder')).rowsAffected

        console.log(result);
        

        return res.status(200).json({
            message: "Order updated successfully"
        })
    } catch (error) {
        return res.json({error})
    }
}

export const deleteOrder = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("orderId", mssql.VarChar, id)
        .execute('deleteOrder')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.status(201).json({
                error: "Order not found"
            })
        }else{
            return res.status(200).json({
                message: "Order deleted successfully"
            })
        }   
    } catch (error) {
        return res.json({error})
    }
}
