const express = require("express");
const router = express.Router();
const Noticia = require("../models/Noticia");
const mongoose = require("mongoose");

// Buscar todas as notícias
router.get("/", async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar notícias." });
  }
});

// Buscar uma notícia por ID
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

// Criar nova notícia
router.post("/", async (req, res) => {
  const { titulo, imagem, categoria, textoCompleto, data, autor, videoUrl } = req.body;

if (!titulo || !imagem || !textoCompleto) {
  return res.status(400).json({ error: "Título, imagem e conteúdo são obrigatórios." });
}

try {
  const novaNoticia = new Noticia({ titulo, imagem, categoria, textoCompleto, data, autor, videoUrl });
    await novaNoticia.save();
    res.status(201).json(novaNoticia);
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar notícia." });
  }
});

module.exports = router;
