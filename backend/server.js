const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Caminho para o arquivo de dados
const filePath = './noticias.json';

// Endpoint para adicionar notícia
app.post('/api/noticias', (req, res) => {
  const novaNoticia = req.body;

  // Lê o arquivo atual
  fs.readFile(filePath, 'utf8', (err, data) => {
    let noticias = [];

    if (!err && data) {
      noticias = JSON.parse(data);
    }

    // Adiciona a nova notícia
    noticias.push(novaNoticia);

    // Escreve de volta no arquivo
    fs.writeFile(filePath, JSON.stringify(noticias, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar notícia:', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }

      res.status(201).json({ mensagem: 'Notícia adicionada com sucesso!' });
    });
  });
});

// Endpoint para listar todas as notícias
app.get('/api/noticias', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err || !data) {
      return res.json([]);
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
