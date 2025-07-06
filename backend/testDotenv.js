import dotenv from 'dotenv';
dotenv.config();

console.log('Todas as variáveis do ambiente com CLOUDINARY_');
Object.entries(process.env)
  .filter(([key]) => key.startsWith('CLOUDINARY_'))
  .forEach(([key, val]) => console.log(key, ':', val));
