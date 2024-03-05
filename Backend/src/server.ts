import express, { json, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { sqlConfig } from './Config/sql.config';
import mssql, { ConnectionPool } from 'mssql';
import productRoutes from './Routes/product.Routes';
import categoryRoutes from './Routes/category.Routes';
import userRouter from './Routes/user.router';
import authRouter from './Routes/auth.router';
import cors from 'cors';
import cartRouter from './Routes/cart.router';

const app = express();

dotenv.config();

app.use(json());
app.use(cors())

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRouter)
app.use('/user', userRouter);
app.use('/auth', authRouter)

const PORT = process.env.PORT as string;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error
    })
})

mssql.connect(sqlConfig, (err?: Error, connect?: ConnectionPool, req?: Request, res?: Response) => {
    if (err) {
        res?.status(500).json({
            err
        })
    } else if (connect) {
        console.log("connected to mssql db");
        const PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        })
    }
})