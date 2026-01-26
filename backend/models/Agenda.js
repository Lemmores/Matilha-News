import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    campeonato: {
      type: String,
      required: true,
    },
    local: {
      type: String,
    },
    linkTransmissao: {
      type: String,
      required: false,
    },
    timeA: {
      nome: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
    },
    timeB: {
      nome: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true, // 🔥 cria createdAt e updatedAt automaticamente
  }
);

const Agenda = mongoose.model('Agenda', agendaSchema);

export default Agenda;
