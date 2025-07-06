import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("🌥️ Testando upload manual para o Cloudinary...");

cloudinary.uploader.upload('./teste.jpg', {
  folder: 'matilha-news'
})
.then(result => {
  console.log("✅ Upload OK:", result.secure_url);
})
.catch(error => {
  console.error("❌ Erro no upload:", error.message);
});
