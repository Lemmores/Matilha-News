import mongoose from 'mongoose';

const conteudoCreatorSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['tiktok', 'reel'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // adiciona createdAt e updatedAt
});

export default mongoose.model('ConteudoCreator', conteudoCreatorSchema);
