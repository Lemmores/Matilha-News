import express from 'express';
import Agenda from '../models/Agenda.js';

const router = express.Router();

// Criar nova partida
router.post('/', async (req, res) => {
  try {
    const nova = new Agenda(req.body);
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obter todas as partidas
router.get('/', async (req, res) => {
  try {
    const partidas = await Agenda.find().sort({ data: 1 });
    res.json(partidas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar uma partida
router.delete('/:id', async (req, res) => {
  try {
    await Agenda.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Partida deletada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar a partida.' });
  }
});

// Editar uma partida
router.put('/:id', async (req, res) => {
  try {
    const atualizada = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(atualizada);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao editar a partida.' });
  }
});

export default router;