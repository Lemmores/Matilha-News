const express = require("express");
const router = express.Router();
const Noticia = require("../models/Noticia");
const mongoose = require("mongoose");

const autenticarAdmin = require("../middlewares/auth");

// Buscar todas as notícias (rota pública)
router.get("/", async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar notícias." });
  }
});

// Buscar uma notícia por ID (rota pública)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const noticia = await Noticia.findById(id);
    if (!noticia) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }
    res.json(noticia);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar notícia." });
  }
});

// Criar nova notícia (rota protegida)
router.post("/", autenticarAdmin, async (req, res) => {
  const { titulo, imagem, categoria, textoCompleto, data, autor, videoUrl } = req.body;

  if (!titulo || !imagem || !textoCompleto) {
    return res.status(400).json({ error: "Título, imagem e conteúdo são obrigatórios." });
  }

  try {
    const novaNoticia = new Noticia({
      titulo,
      imagem,
      categoria,
      textoCompleto,
      data,
      autor,
      videoUrl,
    });

    await novaNoticia.save();
    res.status(201).json(novaNoticia);
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar notícia." });
  }
});

// Deletar notícia por ID (rota protegida)
router.delete("/:id", autenticarAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const noticia = await Noticia.findByIdAndDelete(id);
    if (!noticia) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }
    res.json({ message: "Notícia deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar notícia." });
  }
});

// Atualizar notícia por ID
router.put("/:id", async (req, res) => {
  try {
    const noticiaAtualizada = await Noticia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(noticiaAtualizada);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar a notícia" });
  }
});

module.exports = router;