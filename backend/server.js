import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import noticiasRoutes from './routes/noticias.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';
import watchPartiesRoutes from './routes/watchparties.js';
import agendaRoutes from './routes/agenda.js'; // ✅ movido para cima

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/matilhanews';

// Conexão com o MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(express.json());

// ✅ Servir arquivos da pasta "uploads" como estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Pasta pública (se estiver usando)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/noticias', noticiasRoutes);
app.use('/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchparties', watchPartiesRoutes);
app.use('/api/agenda', agendaRoutes); // ✅ já está correto

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});