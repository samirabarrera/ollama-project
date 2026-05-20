import type { Request, Response } from "express";
import { askOllama, type ChatMessage } from "../services/ollama.serv.js";

const conversationHistory: ChatMessage[] = [];

export const queryAssistant = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "El campo 'text' es requerido y debe ser texto." });
    return;
  }

  try {
    // Llamamos al servicio pasando el historial actual y el nuevo mensaje
    const assistantReply = await askOllama(conversationHistory, text.trim());

    // Guardamos el turno en el historial para mantener la memoria del chat
    conversationHistory.push({ role: "user", content: text.trim() });
    conversationHistory.push({ role: "assistant", content: assistantReply });

    res.status(200).json({
      response: assistantReply,
      history_length: conversationHistory.length / 2, // número de turnos
    });
  } catch (error) {
    console.error("Error al consultar Ollama:", error);
    res.status(500).json({ error: "Error interno al comunicarse con el asistente." });
  }
};

// Endpoint opcional para limpiar el historial
export const clearHistory = (_req: Request, res: Response): void => {
  conversationHistory.length = 0;
  res.status(200).json({ message: "Historial borrado correctamente." });
};