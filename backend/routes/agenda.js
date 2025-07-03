import express from 'express';
import Agenda from '../models/Agenda.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nova = new Agenda(req.body);
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const partidas = await Agenda.find().sort({ data: 1 });
    res.json(partidas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
