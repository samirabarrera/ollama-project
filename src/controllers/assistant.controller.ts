import type { Request, Response } from 'express';
import  OllamaService from '../services/ollama.serv.js';

const ollamaService = new OllamaService();

export const queryAssistant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body; // Recibe el texto enviado por el usuario
    if (!text) {
      res.status(400).json({ error: 'El campo "text" es requerido' });
      return;
    }

    // Llama al servicio
    const responseText = await ollamaService.askOllama(text);
    
    // Devuelve la respuesta
    res.json({ response: responseText });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};