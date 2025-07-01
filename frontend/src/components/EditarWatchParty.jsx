import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NovaWatchParty.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EditarWatchParty = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchWatchParty = async () => {
      try {
        const res = await fetch(`${API_URL}/api/watchparties/${id}`);
        const data = await res.json();
        console.log("Dados recebidos da Watch Party:", data);

        setFormData({
          titulo: data.titulo || '',
          data: data.data || '',
          local: data.local || '',
          imagem: data.imagem || null,
          grupo: data.grupo || '',
          linkDetalhes: data.linkDetalhes || '',
        });
      } catch (error) {
        console.error('Erro ao buscar Watch Party:', error);
      }
    };

    fetchWatchParty();
  }, [id]);

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
        setMensagem('Imagem atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setMensagem('Erro ao enviar imagem.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventoAtualizado = {
        titulo: formData.titulo,
        data: formData.data,
        local: formData.local,
        imagem: formData.imagem,
        grupo: formData.grupo,
        linkDetalhes: formData.linkDetalhes,
      };

      const response = await fetch(`${API_URL}/api/watchparties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventoAtualizado),
      });

      if (response.ok) {
        setMensagem('Watch Party atualizada com sucesso!');
        setTimeout(() => navigate('/gerenciar-wp'), 1500);
      } else {
        setMensagem('Erro ao atualizar Watch Party.');
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="nova-noticia nova-noticia-container">
      <h2>Editar Watch Party</h2>
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
          <img
            src={`${API_URL}${formData.imagem}`}
            alt="Imagem atual"
            style={{ maxHeight: '150px', marginBottom: '1rem' }}
          />
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

        <button type="submit">Atualizar Watch Party</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default EditarWatchParty;
