import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NovaNoticia.css';

const EditarNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const [formData, setFormData] = useState({
    titulo: '',
    data: '',
    imagem: null,
    conteudo: '',
    autor: '',
    categoria: '',
    videoUrl: '',
  });

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/noticias/${id}`);
        const data = await res.json();
        setFormData({
          titulo: data.titulo,
          data: new Date(data.data).toISOString().split('T')[0], // formato yyyy-MM-dd
          imagem: data.imagem,
          conteudo: data.textoCompleto?.join('\n') || '',
          autor: data.autor,
          categoria: data.categoria,
          videoUrl: data.videoUrl || '',
        });
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
      }
    };

    fetchNoticia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formDataImg = new FormData();
    formDataImg.append('imagem', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formDataImg,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, imagem: data.imageUrl }));
        setMensagem('Imagem atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setMensagem('Erro ao atualizar imagem.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noticiaAtualizada = {
        titulo: formData.titulo,
        data: new Date(formData.data).toISOString(),
        imagem: formData.imagem,
        textoCompleto: formData.conteudo.split('\n').filter(Boolean),
        autor: formData.autor,
        categoria: formData.categoria,
        videoUrl: formData.videoUrl,
      };

      const response = await fetch(`http://localhost:5000/api/noticias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticiaAtualizada),
      });

      if (response.ok) {
        setMensagem('Notícia atualizada com sucesso!');
        setTimeout(() => navigate('/painel'), 1500);
      } else {
        setMensagem('Erro ao atualizar notícia.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão ao atualizar notícia.');
    }
  };

  return (
    <div className="nova-noticia nova-noticia-container">
      <h2>Editar Notícia</h2>
      <form onSubmit={handleSubmit} className="nova-noticia-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título da notícia"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data"
          value={formData.data}
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
            src={`http://localhost:5000/${formData.imagem}`}
            alt="Imagem atual"
            style={{ maxHeight: '150px', marginBottom: '1rem' }}
          />
        )}
        <textarea
          name="conteudo"
          placeholder="Conteúdo da notícia"
          value={formData.conteudo}
          onChange={handleChange}
          required
          rows={10}
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
        />
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="LTA SUL">LTA SUL</option>
          <option value="CIRCUITO DESAFIANTE">CIRCUITO DESAFIANTE</option>
          <option value="VALORANT">VALORANT</option>
          <option value="CS2">CS2</option>
          <option value="EXTRAS">EXTRAS</option>
        </select>
        <input
          type="text"
          name="videoUrl"
          placeholder="URL do vídeo do YouTube (opcional)"
          value={formData.videoUrl}
          onChange={handleChange}
        />
        <button type="submit">Atualizar Notícia</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default EditarNoticia;