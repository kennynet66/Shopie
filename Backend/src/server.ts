import express, { NextFunction, Request, Response, json } from 'express';
import userRoutes from './Routes/user.router';
import authRouter from './Routes/auth.router';
import dotenv from 'dotenv';
import cors from 'cors'
import mssql, { ConnectionPool } from 'mssql';
import { sqlConfig } from './Config/sql.config';

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use('/user', userRoutes);
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