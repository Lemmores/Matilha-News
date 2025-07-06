import cloudinary from './config/cloudinary.js';
import fs from 'fs';

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload('./test.jpg', {
      folder: 'matilha-news',
    });
    console.log('✅ Upload OK:', result.secure_url);
  } catch (err) {
    console.error('❌ Upload falhou:', err);
  }
}

testUpload();
