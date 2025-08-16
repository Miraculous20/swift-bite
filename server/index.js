import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import { orderWebhookController } from './controllers/order.controller.js';

// --- Import all routers ---
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';
import uploadRouter from './route/upload.router.js';
import agentRouter from './route/agent.route.js';     
import eateryRouter from './route/eatery.route.js';   

// --- Initialize environment variables ---
dotenv.config();

// --- Create Express App ---
const app = express();

// --- Security, Logging, and Core Middleware ---
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
}));
app.use(cookieParser());

// --- Stripe Webhook Route (MUST be before express.json) ---
app.post('/api/orders/webhook', express.raw({ type: 'application/json' }), orderWebhookController);

// --- General Middleware ---
app.use(express.json());

// --- API Route Setup ---
app.use('/api/users', userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/addresses", addressRouter);
app.use('/api/orders', orderRouter);
app.use("/api/upload", uploadRouter);
app.use('/api/agents', agentRouter);
app.use('/api/eateries', eateryRouter);

// --- Health Check Endpoint ---
app.get('/api', (req, res) => {
    res.json({ message: `Swift-Bite API is running.` });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'An internal server error occurred.'
  });
});

// --- Server and Database Connection ---
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Database connected. Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to the database", err);
    process.exit(1);
});