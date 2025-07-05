import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'matilha-news',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const upload = multer({ storage });

// Upload de imagem com tratamento de erro
router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      console.error("❌ Nenhum arquivo recebido ou sem path:", req.file);
      return res.status(400).json({ error: 'Falha no upload da imagem.' });
    }

    console.log("✅ Upload bem-sucedido:", req.file.path);
    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) {
    console.error("❌ Erro ao enviar imagem:", error);
    res.status(500).json({ error: 'Erro interno ao enviar imagem para o Cloudinary.' });
  }
});

export default router;
