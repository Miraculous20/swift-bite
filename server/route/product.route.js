import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';
import {
    createProductController,
    getProductsController,
    getProductDetailsController,
    updateProductController,
    deleteProductController,
    searchProductsController
} from '../controllers/product.controller.js';

const productRouter = Router();

// PUBLIC ROUTES
productRouter.get('/', getProductsController);
productRouter.get('/search', searchProductsController); // For search-specific logic
productRouter.get('/:id', getProductDetailsController);

// ADMIN-ONLY ROUTES
productRouter.post('/', authMiddleware, checkRole('ADMIN'), createProductController);
productRouter.put('/:id', authMiddleware, checkRole('ADMIN'), updateProductController);
productRouter.delete('/:id', authMiddleware, checkRole('ADMIN'), deleteProductController);

export default productRouter;