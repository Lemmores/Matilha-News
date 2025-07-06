import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import uploadRoutes from './routes/upload.js';
import noticiasRoutes from './routes/noticias.js';
import authRoutes from './routes/auth.js';
import watchPartiesRoutes from './routes/watchparties.js';
import agendaRoutes from './routes/agenda.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/matilhanews';

// 🔍 Log de verificação das variáveis de ambiente do Cloudinary
console.log("🔍 Cloudinary envs:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

console.log("MONGO_URI:", process.env.MONGO_URI);

// Conectar ao MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado ao MongoDB"))
.catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// Configuração CORS
const corsOptions = {
  origin: ['https://matilha-news.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// ⚠️ A rota /upload deve vir ANTES do express.json()
app.use('/upload', uploadRoutes);

// Middleware para parsear JSON (não deve afetar multipart/form-data)
app.use(express.json());

// Demais rotas da API
app.use('/api/noticias', noticiasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchparties', watchPartiesRoutes);
app.use('/api/agenda', agendaRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
