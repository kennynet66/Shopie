import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts, getOneProduct, updateProduct } from "../Controllers/product.Controller";

const productRoutes = Router();

productRoutes.post('/new-product', createProduct);
productRoutes.get('/all-products', getAllProducts);
productRoutes.get('/:productId', getOneProduct);
productRoutes.delete('/delete/:productId', deleteProduct);
productRoutes.put('/update/:productId', updateProduct);
productRoutes.get('/category-products/:categoryId', getCategoryProducts)

export default productRoutes