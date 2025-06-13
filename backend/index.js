const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve arquivos estáticos

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pasta onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Rota de upload
app.post('/upload', upload.single('imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  // Retorna a URL da imagem salva
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Exemplo de rota POST para uma notícia (pode adaptar)
app.post('/api/noticias', (req, res) => {
  console.log('Nova notícia recebida:', req.body);
  res.status(200).json({ message: 'Notícia salva!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
