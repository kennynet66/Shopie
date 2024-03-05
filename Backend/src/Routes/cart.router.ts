import { Router } from "express";
import { createCart, getAllUsersCarts, getUserCart, updateCart, deleteCart } from "../Controllers/cart.Controller";
import { verifyToken } from "../Middleware/verifyToken";

const cartRouter = Router()

cartRouter.post('/', createCart);
cartRouter.get('/', getAllUsersCarts )
cartRouter.get('/:userId',  getUserCart)
cartRouter.patch('/:userId/:id', verifyToken, updateCart)  //try PATCH
cartRouter.delete('/:id', verifyToken, deleteCart);

export default cartRouter;