import dotenv from "dotenv";
dotenv.config();

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434/api/chat";

const SYSTEM_PROMPT = `Tutor de JavaScript y enseñas en español`;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OllamaResponse {
  message: ChatMessage;
  done: boolean;
}

export async function askOllama(historial: ChatMessage[], mensaje: string): Promise<string> {
  const mensajes: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...historial,
    { role: "user", content: mensaje },
  ];

  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3",
      messages: mensajes,
      stream: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`Error de Ollama: ${res.status}`);
  }

  const data = (await res.json()) as OllamaResponse;
  return data.message.content;
}