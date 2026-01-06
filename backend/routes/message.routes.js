import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import { singleUpload } from '../middlewares/multer.middleware.js';

const router = express.Router()

router.route('/send-message/:id').post(isAuthenticated, singleUpload, sendMessage)
router.route('/get-message/:id').get(isAuthenticated, getMessage)

export default router;