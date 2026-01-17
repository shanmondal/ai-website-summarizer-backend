import express from 'express';
import { summarizeWebsite } from '../controllers/summarizeController.js';

const router = express.Router();
router.post('/', summarizeWebsite);

export default router;
