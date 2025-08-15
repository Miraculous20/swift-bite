import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { 
    addToCartController, 
    deleteCartItemController,
    getCartController, 
    updateCartItemQtyController 
} from "../controllers/cart.controller.js";

const cartRouter = Router();

// All cart routes require a logged-in user
cartRouter.get('/', authMiddleware, getCartController);
cartRouter.post('/', authMiddleware, addToCartController);
cartRouter.patch('/:cartItemId', authMiddleware, updateCartItemQtyController);
cartRouter.delete('/:cartItemId', authMiddleware, deleteCartItemController);

export default cartRouter;