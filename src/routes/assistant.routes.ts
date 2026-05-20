import { Router } from 'express';
import { queryAssistant } from '../controllers/assistant.controller.js';

const router = Router();

// Define el endpoint requerido en la tercera sección
router.post('/query', queryAssistant);

export default router;