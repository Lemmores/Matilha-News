import mongoose from 'mongoose';

const NoticiaSchema = new mongoose.Schema({
  titulo: String,
  imagem: String,
  resumo: String,
  textoCompleto: [String],
  autor: String,
  categoria: String, // <-- nova categoria
  data: { type: Date, default: Date.now },
  videoUrl: String
});

const Noticia = mongoose.model('Noticia', NoticiaSchema);

export default Noticia;
