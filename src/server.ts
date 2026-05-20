import express from "express";
import dotenv from "dotenv";
import { assistantRouter } from "./routes/assistant.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// Todas las rutas del asistente bajo /api
app.use("/api", assistantRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
  console.log(`Endpoint disponible: POST http://127.0.0.1:${PORT}/api/query`);
});