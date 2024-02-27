import express, { json } from 'express';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

app.use(json());

const PORT = process.env.PORT as string;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
})