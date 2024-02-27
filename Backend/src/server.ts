import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT as string;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
})