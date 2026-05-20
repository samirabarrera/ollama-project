import axios from 'axios';

export class OllamaService {
  private ollamaUrl = 'http://localhost:11434/api/generate';

  private chatHistory: string[] = []; 

  async askOllama(prompt: string): Promise<string> {
    const systemPrompt = "Eres un profesor experto en JavaScript. Responder en español, con ejemplos simples y tono amigable.";

    const fullPrompt = `${systemPrompt}\nHistorial:\n${this.chatHistory.join('\n')}\nUsuario: ${prompt}`;

    try {
      const response = await axios.post(this.ollamaUrl, {
        model: 'gemma3',
        prompt: fullPrompt,
        stream: false 
      });
      
      this.chatHistory.push(`Usuario: ${prompt}`, `Asistente: ${response.data.response}`);
      
      return response.data.response;
    } catch (error) {
      throw new Error('Error al conectar con Ollama');
    }
  }
}

export default OllamaService;