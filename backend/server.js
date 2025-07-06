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

// ✅ Configuração CORS para aceitar requisições do frontend publicado
const corsOptions = {
  origin: ['https://matilha-news.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use('/api/noticias', noticiasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchparties', watchPartiesRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/upload', uploadRoutes);

// Caso precise servir arquivos estáticos:
// app.use(express.static(path.join(__dirname, 'public')));

// **Conecta ao MongoDB e só depois sobe o servidor**
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
  });

console.log("MONGO_URI:", process.env.MONGO_URI);
