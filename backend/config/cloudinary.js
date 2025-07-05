import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do .env
dotenv.config();

// Configura o Cloudinary com as variáveis do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ex: 'matilha-news'
  api_key: process.env.CLOUDINARY_API_KEY,       // ex: '185685797741558'
  api_secret: process.env.CLOUDINARY_API_SECRET, // ex: 'u_fMOonn5ljLpq0y1GuPPHBYLCo'
  secure: true, // Garante URLs HTTPS
});

export default cloudinary;
