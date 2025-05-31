import React, { useEffect } from 'react';
import './MatilhaTactics.css';

export default function MatilhaTactics() {
 useEffect(() => {
    document.body.classList.add('matilha-bg');

    return () => {
      document.body.classList.remove('matilha-bg');
    };
  }, []);

  return (
    <div className="matilha-tactics">
      <h1>Matilha Tactics</h1>

      <img
        src="/bannermatilha.jpg"
        alt="Banner do Matilha Tactics"
        className="banner-tactics"
      />

      <p className="descricao">
        O <strong>Matilha Tactics</strong>  é um torneio emocionante de Team Fight Tactics (TFT), exclusivo para os torcedores apaixonados da RED CANIDS! Com um limite de 32 competidores, essa é a sua chance de mostrar toda a sua habilidade e estratégia para se tornar o melhor competidor da matilha.

Quer entrar nessa disputa acirrada e provar que você é o verdadeiro mestre do TFT? Então, inscreva-se aqui e prepare-se para batalhas intensas e muita diversão.
      </p>

      <h3>Faça aqui a sua inscrição!</h3>

      <div className="formulario-container">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdKOwSIX1J3fMMt-ub4UHjWgheznlBVPeFA8TyszgXq3rnJCA/viewform?embedded=true"
          title="Formulário de Inscrição"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
