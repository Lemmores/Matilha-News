const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noticiasRoutes = require('./routes/noticias');
const uploadRoutes = require('./routes/upload');
const path = require('path');

const app = express();
const PORT = 5000;

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

// 🔥 Aqui você serve a pasta 'public' como estática
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/noticias', noticiasRoutes);
app.use('/upload', uploadRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);