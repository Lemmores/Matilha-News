import express from 'express';
import WatchParty from '../models/WatchParty.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const parties = await WatchParty.find();
  res.json(parties);
});

router.post('/', async (req, res) => {
  const party = new WatchParty(req.body);
  await party.save();
  res.status(201).json(party);
});

router.delete('/:id', async (req, res) => {
  await WatchParty.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.put('/:id', async (req, res) => {
  const updated = await WatchParty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🚨 A rota que estava faltando
router.get('/:id', async (req, res) => {
  try {
    const watchParty = await WatchParty.findById(req.params.id);
    if (!watchParty) return res.status(404).json({ error: 'Watch Party não encontrada' });
    res.json(watchParty);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar Watch Party' });
  }
});

export default router;