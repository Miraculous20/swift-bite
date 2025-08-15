import { Router } from 'express';
import { 
    registerAgentController, 
    loginAgentController,
    getAvailableJobsController,
    acceptJobController,
    getAgentDetailsController, 
    logoutAgentController,     
    getDeliveryHistoryController
} from '../controllers/agent.controller.js';
import authAgentMiddleware from '../middleware/authAgent.js';

const agentRouter = Router();

// Public routes
agentRouter.post('/register', registerAgentController);
agentRouter.post('/login', loginAgentController);

// Protected routes (require agent login)
agentRouter.get('/details', authAgentMiddleware, getAgentDetailsController);
agentRouter.get('/logout', authAgentMiddleware, logoutAgentController);
agentRouter.get('/jobs', authAgentMiddleware, getAvailableJobsController);
agentRouter.get('/history', authAgentMiddleware, getDeliveryHistoryController);
agentRouter.post('/jobs/accept/:orderId', authAgentMiddleware, acceptJobController);

export default agentRouter;