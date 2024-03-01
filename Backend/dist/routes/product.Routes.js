"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_Controller_1 = require("../Controllers/product.Controller");
const productRoutes = (0, express_1.Router)();
productRoutes.post('/new-product', product_Controller_1.createProduct);
productRoutes.get('/all-products', product_Controller_1.getAllProducts);
productRoutes.delete('/delete-product/:productId', product_Controller_1.deleteProduct);
exports.default = productRoutes;