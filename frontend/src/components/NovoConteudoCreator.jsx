import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NovoConteudoCreator.css';

const API_URL = 'https://matilha-news-backend-url.com/api/conteudos-creators'; // substitua pela URL correta

const creatorsNomes = [
  'MEDU', 'ISMALAKOI', 'PEU', 'DYEN',
  'IASSER', 'AMMY', 'ISAC', 'JOÃO DIAS'
];

export default function NovoConteudoCreator() {
  const [creator, setCreator] = useState('');
  const [tipo, setTipo] = useState('tiktok');
  const [url, setUrl] = useState('');
  const [conteudos, setConteudos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // Buscar conteúdos existentes
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setConteudos(res.data))
      .catch(err => console.error('Erro ao buscar conteúdos:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creator || !tipo || !url) return alert('Preencha todos os campos');

    const novoConteudo = { creator, tipo, url };

    try {
      if (editandoId) {
        await axios.put(`${API_URL}/${editandoId}`, novoConteudo);
        setEditandoId(null);
      } else {
        await axios.post(API_URL, novoConteudo);
      }

      // Atualiza lista
      const res = await axios.get(API_URL);
      setConteudos(res.data);

      // Limpar formulário
      setCreator('');
      setTipo('tiktok');
      setUrl('');
    } catch (err) {
      console.error('Erro ao salvar conteúdo:', err);
      alert('Erro ao salvar conteúdo');
    }
  };

  const handleEditar = (conteudo) => {
    setCreator(conteudo.creator);
    setTipo(conteudo.tipo);
    setUrl(conteudo.url);
    setEditandoId(conteudo._id);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setConteudos(conteudos.filter(c => c._id !== id));
    } catch (err) {
      console.error('Erro ao deletar conteúdo:', err);
    }
  };

  return (
    <div className="novo-conteudo-creator">
      <h2>{editandoId ? 'Editar Conteúdo' : 'Novo Conteúdo de Creator'}</h2>

      <form onSubmit={handleSubmit} className="formulario-creator">
        <label>
          Creator:
          <select value={creator} onChange={(e) => setCreator(e.target.value)}>
            <option value="">Selecione</option>
            {creatorsNomes.map(nome => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>
        </label>

        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="tiktok">TikTok</option>
            <option value="reel">Instagram Reel</option>
          </select>
        </label>

        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>

        <button type="submit">
          {editandoId ? 'Salvar Edição' : 'Adicionar Conteúdo'}
        </button>
      </form>

      <hr />

      <h3>Conteúdos Cadastrados</h3>
      <ul className="lista-conteudos">
        {conteudos.map((c) => (
          <li key={c._id}>
            <strong>{c.creator}</strong> — {c.tipo} <br />
            <small>{c.url}</small>
            <div className="botoes-acoes">
              <button onClick={() => handleEditar(c)}>Editar</button>
              <button onClick={() => handleDeletar(c._id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
