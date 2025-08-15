import { Router } from 'express';
import { 
    registerEateryController,
    getEateryOrdersController,
    getAllEateriesController,
    getEateryMenuController
} from '../controllers/eatery.controller.js';
import authEateryMiddleware from '../middleware/authEatery.js';

const eateryRouter = Router();

// --- Public Routes ---
eateryRouter.get('/', getAllEateriesController); // Get a list of all eateries
eateryRouter.get('/menu/:eateryId', getEateryMenuController); // Get a specific eatery's menu
eateryRouter.post('/register', registerEateryController); // Register a new eatery

// --- Protected Eatery Admin Routes ---
eateryRouter.get('/orders', authEateryMiddleware, getEateryOrdersController);

export default eateryRouter;