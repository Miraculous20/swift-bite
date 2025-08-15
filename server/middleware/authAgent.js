import jwt from 'jsonwebtoken';
import AgentModel from '../models/agent.model.js';

const authAgentMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.agentAccessToken || req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Agent authentication required." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    
    const agent = await AgentModel.findById(decoded.id).select('-password');
    if (!agent) {
      return res.status(401).json({ success: false, message: "Agent not found." });
    }

    req.agent = agent; // Attach agent object to the request
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired agent token." });
  }
};

export default authAgentMiddleware;