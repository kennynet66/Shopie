import { Router } from "express";
import { createCategory, getAllCategories, getCategoryDetails } from "../Controllers/category.Controller";

const categoryRoutes = Router()

categoryRoutes.post('/new-category', createCategory);
categoryRoutes.get('/all-categories', getAllCategories);
categoryRoutes.get('/:categoryId', getCategoryDetails);

export default categoryRoutes;