const MODEL_NAME = "gemma3";

const chatModel = new ChatOllama ({
    model: MODEL_NAME,
    temperature: 0,
    baseUrl: "http://localhost:11434",
});