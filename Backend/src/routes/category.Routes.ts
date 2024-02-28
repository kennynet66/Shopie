import { Router } from "express";
import { createCategory, getAllCategories } from "../Controllers/category.Controller";

const categoryRoutes = Router()

categoryRoutes.post('/new-category', createCategory);
categoryRoutes.get('/all-categories', getAllCategories);

export default categoryRoutes;