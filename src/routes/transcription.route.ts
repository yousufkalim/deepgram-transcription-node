/**
 * Transcription routes
 * @author Yousuf Kalim
 */
import { Router } from 'express';
import { transcribePreRecorded } from '@controllers/transcription.controller';
import { upload } from '@middleware/multer.middleware';
const router = Router();

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post transcribe
 */

// Create - User Signup
router.post('/transcribe', upload.single('audio'), transcribePreRecorded);

// Export
export default router;
