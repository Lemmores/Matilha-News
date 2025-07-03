import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema({
  data: String,
  hora: String,
  campeonato: String,
  local: String,
  timeA: {
    nome: String,
    logo: String
  },
  timeB: {
    nome: String,
    logo: String
  }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

export default Agenda;
