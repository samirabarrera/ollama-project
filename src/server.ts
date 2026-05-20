import express from 'express';
import assistantRoutes from './routes/assistant.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', assistantRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running perfectly' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
  console.log(`🤖 Endpoint del asistente listo en: http://localhost:${PORT}/api/query`);
});

export default app;