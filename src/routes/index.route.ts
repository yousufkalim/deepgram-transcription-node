/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
import { Router } from 'express';
import adminRoutes from './admins.route';
import userRoutes from './users.route';
import authRoutes from './auth.route';
import transcriptions from './transcription.route';
const router = Router();

// Parent Routes
router.use('/admins', adminRoutes); // All the user routes
router.use('/users', userRoutes); // All the user routes
router.use('/auth', authRoutes); // All the auth routes
router.use('/transcriptions', transcriptions); // All the transcription related routes

// Export
export default router;
