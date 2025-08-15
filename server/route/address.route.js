import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { 
    addAddressController, 
    deleteAddressController, // <-- This now matches the corrected controller export
    getAddressController, 
    updateAddressController 
} from '../controllers/address.controller.js';

const addressRouter = Router();

// All routes are protected and operate on the logged-in user's data
addressRouter.get('/', authMiddleware, getAddressController);
addressRouter.post('/', authMiddleware, addAddressController);
addressRouter.put('/:addressId', authMiddleware, updateAddressController);
addressRouter.delete('/:addressId', authMiddleware, deleteAddressController);

export default addressRouter;