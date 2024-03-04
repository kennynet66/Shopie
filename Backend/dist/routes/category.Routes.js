"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_Controller_1 = require("../Controllers/category.Controller");
const categoryRoutes = (0, express_1.Router)();
categoryRoutes.post('/new-category', category_Controller_1.createCategory);
categoryRoutes.get('/all-categories', category_Controller_1.getAllCategories);
categoryRoutes.get('/:categoryId', category_Controller_1.getCategoryDetails);
exports.default = categoryRoutes;
