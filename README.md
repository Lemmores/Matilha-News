# 🐺 Matilha News

**Matilha News** é um portal de notícias e conteúdo feito para a torcida da RED Canids Kalunga, com o objetivo de informar e engajar a comunidade com as últimas atualizações sobre campeonatos, line-ups, eventos, watch parties e muito mais!

## 🔥 Funcionalidades

- 📰 Carrossel de notícias com visual moderno e dinâmico
- 🏆 Página dedicada à LTA SUL, com jogadores, agenda e vídeos
- 🎮 Filtro por modalidades: LTA SUL, Circuito Desafiante, CS2, Valorant e Creators
- 📅 Agenda de próximos jogos e eventos da RED
- 📷 Upload de imagens para notícias diretamente do painel
- 📱 Layout responsivo e otimizado para mobile

## 🚀 Tecnologias Utilizadas

### Front-end
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- CSS tradicional
- React Router DOM

### Back-end
- Node.js + Express
- MongoDB (MongoDB Atlas)
- Multer (upload de arquivos)

### Organização
- Estrutura monorepo com [Turborepo](https://turbo.build/)
- Separação de frontend e backend em pastas distintas

## 📦 Instalação

Clone o repositório e instale as dependências de cada pacote:

```bash
git clone https://github.com/seu-usuario/matilha-news.git
cd matilha-news

# Instalar dependências com Turborepo
npm install

# Rodar o frontend
cd apps/frontend
npm run dev

# Rodar o backend
cd ../../apps/backend
npm run dev
```

> Certifique-se de configurar as variáveis de ambiente no backend, como a conexão com o MongoDB Atlas.

## 📁 Estrutura do Projeto

```
matilha-news/
├── apps/
│   ├── frontend/       # Projeto React com Vite
│   └── backend/        # API em Node.js com Express e MongoDB
├── public/             # Imagens públicas e estáticas
├── packages/           # Pacotes compartilhados (opcional)
├── turbo.json          # Configuração do Turborepo
└── README.md
```

## 🧩 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Feito com ❤️ pela torcida da **RED Canids Kalunga**.
