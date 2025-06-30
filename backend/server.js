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

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();

// Corrige __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Porta do servidor (usa variável de ambiente ou 5000)
const PORT = process.env.PORT || 5000;

// Usa a variável MONGO_URI ou conecta localmente (fallback)
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/matilhanews';

// Conexão com MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Pasta estática (ex: imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/noticias', noticiasRoutes);
app.use('/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchparties', watchPartiesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
