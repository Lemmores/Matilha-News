// NovaWatchParty.jsx
import React, { useRef, useState } from 'react';
import './NovaWatchParty.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NovaWatchParty = () => {
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const [mensagem, setMensagem] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    data: '',
    local: '',
    imagem: null,
    grupo: '',
    linkDetalhes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append('imagem', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formDataImg,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData(prev => ({ ...prev, imagem: data.imageUrl }));
        setMensagem('Imagem enviada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setMensagem('Erro ao enviar imagem.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novaWP = {
        titulo: formData.titulo,
        data: formData.data,
        local: formData.local,
        imagem: formData.imagem,
        grupo: formData.grupo,
        linkDetalhes: formData.linkDetalhes,
      };

      const response = await fetch(`${API_URL}/api/watchparties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaWP),
      });

      if (response.ok) {
        setMensagem('Watch Party criada com sucesso!');
        setTimeout(() => navigate('/gerenciar-wp'), 1500);
      } else {
        setMensagem('Erro ao criar Watch Party.');
      }
    } catch (error) {
      console.error('Erro ao criar:', error);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="nova-noticia nova-noticia-container">
      <h2>Nova Watch Party</h2>
      <form onSubmit={handleSubmit} className="nova-noticia-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="data"
          placeholder="Data (dd/mm/aaaa)"
          value={formData.data}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="local"
          placeholder="Local"
          value={formData.local}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleImageUpload}
          ref={inputFileRef}
        />
        {formData.imagem && (
          <img src={formData.imagem} alt="Preview" style={{ maxHeight: '150px', marginBottom: '1rem' }} />
        )}
        <input
          type="url"
          name="grupo"
          placeholder="Link do grupo WhatsApp"
          value={formData.grupo}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="linkDetalhes"
          placeholder="Link de detalhes (Instagram, etc)"
          value={formData.linkDetalhes}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar Watch Party</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default NovaWatchParty;
