import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import noticiasRoutes from './routes/noticias.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';
import watchPartiesRoutes from './routes/watchparties.js';

const app = express();
const PORT = 5000;

// ⚙️ Corrige __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexão com MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/matilhanews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
