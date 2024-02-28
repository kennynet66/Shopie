import express, { json } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.Routes';
import categoryRoutes from './routes/category.Routes';
const app = express();

dotenv.config();

app.use(json());

// Import product routes
app.use('/products', productRoutes);

// Import category routes
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT as string;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
})