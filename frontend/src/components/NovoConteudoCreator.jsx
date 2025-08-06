import React, { useState } from 'react';
import axios from 'axios';
import './NovaNoticia.css';

const NovaConteudoCreator = () => {
  const [formData, setFormData] = useState({
    creator: '',
    tipo: '',
    url: ''
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://matilha-api.onrender.com/api/conteudos-creators', formData);
      setMensagem('Conteúdo salvo com sucesso!');
      setFormData({ creator: '', tipo: '', url: '' });
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error);
      setMensagem('Erro ao salvar conteúdo. Verifique os campos.');
    }
  };

  return (
    <div className="nova-noticia-container">
      <h2>Novo Conteúdo de Creator</h2>
      <form onSubmit={handleSubmit} className="nova-noticia-form">
        <select
          name="creator"
          value={formData.creator}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o Creator</option>
          <option value="MEDU">MEDU</option>
          <option value="ISMALAKOI">ISMALAKOI</option>
          <option value="PEU">PEU</option>
          <option value="DYEN">DYEN</option>
          <option value="IASSER">IASSER</option>
          <option value="AMMY">AMMY</option>
          <option value="ISAC">ISAC</option>
          <option value="JOÃO DIAS">JOÃO DIAS</option>
        </select>

        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o Tipo</option>
          <option value="reel">Reel</option>
          <option value="tiktok">TikTok</option>
        </select>

        <input
          type="text"
          name="url"
          placeholder="URL do vídeo (Reels ou TikTok)"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <button type="submit">Salvar Conteúdo</button>
        {mensagem && <div className="mensagem">{mensagem}</div>}
      </form>
    </div>
  );
};

export default NovaConteudoCreator;
