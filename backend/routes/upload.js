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

router.post('/', upload.single('imagem'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Falha no upload da imagem.' });
  }

  res.status(200).json({ imageUrl: req.file.path }); // Cloudinary já retorna URL
});

export default router;
