import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts } from "../Controllers/product.Controller";

const productRoutes = Router();

productRoutes.post('/new-product', createProduct);
productRoutes.get('/all-products', getAllProducts);
productRoutes.delete('/delete-product/:productId', deleteProduct);
productRoutes.get('/category-products/:categoryId', getCategoryProducts)

export default productRoutes