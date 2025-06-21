import mongoose from 'mongoose';

const WatchPartySchema = new mongoose.Schema({
  titulo: String,
  data: String, // pode ser armazenado como Date também
  local: String,
  imagem: String,
  grupo: String,
  linkDetalhes: String
});

export default mongoose.model('WatchParty', WatchPartySchema);
