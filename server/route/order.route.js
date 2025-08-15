import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { 
    cashOnDeliveryOrderController, 
    getOrderDetailsController, 
    paymentController,
    getAllOrdersController
} from '../controllers/order.controller.js';

const orderRouter = Router();

// All order routes require a logged-in user
orderRouter.get('/', authMiddleware, getAllOrdersController);
orderRouter.get('/:orderId', authMiddleware, getOrderDetailsController);
orderRouter.post('/checkout-session', authMiddleware, paymentController);
orderRouter.post('/cash-on-delivery', authMiddleware, cashOnDeliveryOrderController);

export default orderRouter;