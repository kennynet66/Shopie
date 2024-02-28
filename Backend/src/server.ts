import express, { json, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.Routes';
import categoryRoutes from './routes/category.Routes';
import { sqlConfig } from './Config/sql.config';
import mssql, { ConnectionPool } from 'mssql';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';

const app = express();

dotenv.config();

app.use(json());

// Import product routes
app.use('/products', productRoutes);

// Import category routes
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT as string;



app.use('/user', userRouter);
app.use('/auth', authRouter)

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