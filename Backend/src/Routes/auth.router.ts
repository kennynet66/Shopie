import { Router } from "express";
import { checkUserDetails, loginUser, resetPassword, logoutUser } from "../Controllers/auth.controller";
import { verifyToken } from "../Middleware/verifyToken";

const authRouter = Router()

authRouter.post('/login', loginUser)
authRouter.get('/checkdetails', verifyToken, checkUserDetails)
authRouter.put('/resetPassword', resetPassword)
authRouter.post('/logout', verifyToken, logoutUser);


export default authRouter 