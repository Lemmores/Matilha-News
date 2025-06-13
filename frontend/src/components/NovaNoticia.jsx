import React, { useState } from 'react';
import './NovaNoticia.css';

const NovaNoticia = () => {
const [formData, setFormData] = useState({
  titulo: '',
  data: '',
  imagem: null, // agora será um arquivo
  conteudo: '',
  autor: '',
});

const enviarImagem = async (file) => {
  const formData = new FormData();
  formData.append('imagem', file);

  const response = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Erro ao fazer upload da imagem');

  const data = await response.json();
  return data.imageUrl; // URL retornada do backend
};


  const [mensagem, setMensagem] = useState('');

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
        setMensagem('Imagem enviada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setMensagem('Erro ao enviar imagem.');
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let imageUrl = '';
    if (formData.imagem) {
      imageUrl = await enviarImagem(formData.imagem);
    }

    const noticiaFormatada = {
      titulo: formData.titulo,
      data: formData.data,
      imagem: imageUrl,
      conteudo: formData.conteudo.split('\n').filter(Boolean),
      autor: formData.autor,
    };

    const response = await fetch('http://localhost:5000/api/noticias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noticiaFormatada),
    });

    if (response.ok) {
      setMensagem('Notícia enviada com sucesso!');
      setFormData({ titulo: '', data: '', imagem: null, conteudo: '', autor: '' });
    } else {
      setMensagem('Erro ao enviar notícia.');
    }
  } catch (error) {
    console.error(error);
    setMensagem('Erro de conexão ou upload da imagem.');
  }
};


  return (
    <div className="nova-noticia nova-noticia-container">
      <h2>Adicionar Nova Notícia</h2>
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
          type="text"
          name="data"
          placeholder="Data"
          value={formData.data}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imagem: e.target.files[0] }))
          }
        />

        <textarea
          name="conteudo"
          placeholder="Conteúdo da notícia (separe os parágrafos com quebras de linha)"
          value={formData.conteudo}
          onChange={handleChange}
          required
          rows={10}
        ></textarea>
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
        />
        <button type="submit">Enviar Notícia</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default NovaNoticia;
