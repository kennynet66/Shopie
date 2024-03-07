import { Router } from "express";
import { createUser, deleteUser, getUser, getAllUsers, updateUser } from "../Controllers/users.controller";
import { verifyToken } from "../Middleware/verifyToken";

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/:id', verifyToken, getUser)
userRouter.get('/', verifyToken, getAllUsers)
userRouter.put('/update/:id', verifyToken, updateUser)
userRouter.delete('/delete/:id', verifyToken, deleteUser)

export default userRouter