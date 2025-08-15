import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { checkRole } from '../middleware/checkRole.js';
import { 
    createSubCategoryController, // <-- This now matches the controller export
    deleteSubCategoryController, 
    getSubCategoriesController, 
    updateSubCategoryController 
} from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

// PUBLIC ROUTE
subCategoryRouter.get('/', getSubCategoriesController);

// ADMIN-ONLY ROUTES
subCategoryRouter.post('/', authMiddleware, checkRole('ADMIN'), createSubCategoryController);
subCategoryRouter.put('/:id', authMiddleware, checkRole('ADMIN'), updateSubCategoryController);
subCategoryRouter.delete('/:id', authMiddleware, checkRole('ADMIN'), deleteSubCategoryController);

export default subCategoryRouter;