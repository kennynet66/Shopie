import { Router } from "express";
import { createOrder, getAllOrders, getSingleOrder, updateOrder, deleteOrder } from "../Controllers/orders.controller";
// import { verifyToken } from "../Middleware/verifyToken";

const orderRoutes = Router()

orderRoutes.post('/', createOrder)
orderRoutes.get('/', getAllOrders)
orderRoutes.get('/:orderId', getSingleOrder)
orderRoutes.patch('/update/:id', getSingleOrder)
orderRoutes.delete('/delete/:id', deleteOrder)

export default orderRoutes