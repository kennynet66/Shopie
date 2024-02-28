import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts } from "../Controllers/product.Controller";

const productRoutes = Router();

productRoutes.post('/new-product', createProduct);
productRoutes.get('/all-products', getAllProducts);
productRoutes.delete('/delete-product/:productId', deleteProduct);

export default productRoutes