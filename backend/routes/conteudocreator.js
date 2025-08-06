import express from 'express';
import ConteudoCreator from '../models/ConteudoCreator.js';

const router = express.Router();

// GET - Listar todos os conteúdos
router.get('/', async (req, res) => {
  try {
    const conteudos = await ConteudoCreator.find();
    res.json(conteudos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar conteúdos' });
  }
});

// POST - Criar novo conteúdo
router.post('/', async (req, res) => {
  const { creator, tipo, url } = req.body;

  if (!creator || !tipo || !url) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const novoConteudo = new ConteudoCreator({ creator, tipo, url });
    await novoConteudo.save();
    res.status(201).json(novoConteudo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar conteúdo' });
  }
});

// PUT - Editar conteúdo existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { creator, tipo, url } = req.body;

  try {
    const conteudoAtualizado = await ConteudoCreator.findByIdAndUpdate(
      id,
      { creator, tipo, url },
      { new: true }
    );

    if (!conteudoAtualizado) {
      return res.status(404).json({ error: 'Conteúdo não encontrado' });
    }

    res.json(conteudoAtualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar conteúdo' });
  }
});

// DELETE - Deletar conteúdo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const conteudoRemovido = await ConteudoCreator.findByIdAndDelete(id);

    if (!conteudoRemovido) {
      return res.status(404).json({ error: 'Conteúdo não encontrado' });
    }

    res.json({ message: 'Conteúdo deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar conteúdo' });
  }
});

export default router;
