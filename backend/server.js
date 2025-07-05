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

// Conecta ao MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/noticias', noticiasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchparties', watchPartiesRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/upload', uploadRoutes);

// Caso precise servir algum arquivo estático, defina aqui
// Exemplo para frontend estático: app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
