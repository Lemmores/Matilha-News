import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Storage configurado com Cloudinary
let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'matilha-news',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
  });
  console.log("✅ CloudinaryStorage inicializado");
} catch (e) {
  console.error("❌ Falha ao configurar CloudinaryStorage:", e);
}

// Multer com storage configurado
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post('/', async (req, res) => {
  console.log("📦 Rota /upload acessada");

  // Executa manualmente o middleware para capturar erro
  upload.single('imagem')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error("❌ Erro do Multer:", err.message);
      return res.status(500).json({ error: "Erro do Multer: " + err.message });
    } else if (err) {
      console.error("❌ Erro ao processar upload:", err);
      return res.status(500).json({ error: "Erro interno: " + err.message });
    }

    try {
      if (!req.file || !req.file.path) {
        console.error("❌ Nenhum arquivo recebido ou sem path:", req.file);
        return res.status(400).json({ error: 'Falha no upload da imagem.' });
      }

      console.log("✅ Upload bem-sucedido:", req.file.path);
      res.status(200).json({ imageUrl: req.file.path });
    } catch (error) {
      console.error("❌ Erro no bloco try/catch final:");
      console.error("🔍 Erro completo:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      res.status(500).json({ error: 'Erro interno ao enviar imagem para o Cloudinary.' });
    }
  });
});

export default router;
