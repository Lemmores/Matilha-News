import React, { useState } from 'react';
import './Contato.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('Enviando...');

  try {
    const response = await fetch('https://formsubmit.co/ajax/coletivoredcanids@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        nome: formData.nome,
        email: formData.email,
        mensagem: formData.mensagem,
      }),
    });

    const result = await response.json();

    if (result.success === 'true') {
      setStatus('Mensagem enviada com sucesso!');
      setShowToast(true);
      setFormData({ nome: '', email: '', mensagem: '' });

      setTimeout(() => {
        setShowToast(false);
        setStatus('');
      }, 4000);
    } else {
      setStatus('Erro ao enviar. Tente novamente.');
      setShowToast(true);
    }
  } catch (error) {
    setStatus('Erro na conexão. Tente mais tarde.');
    setShowToast(true);
  }
};


  return (
    <div className="pagina-contato">
      <h1>Entre em Contato</h1>
      <form onSubmit={handleSubmit} className="form-contato">
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensagem"
          placeholder="Escreva seu feedback, ideias ou sugestões..."
          value={formData.mensagem}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>

      {showToast && (
        <div className="toast">
          {status}
        </div>
      )}
    </div>
  );
};

export default Contato;
