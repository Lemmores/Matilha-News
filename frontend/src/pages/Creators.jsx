import { useState } from 'react';
import './Creators.css';

const creators = [
  {
    nome: 'MEDU',
    img: '/creators/Medu.jpg',
    twitter: 'https://x.com/medulol1',
    instagram: 'https://www.instagram.com/medulol1/',
  },
  {
    nome: 'ISMALAKOI',
    img: '/creators/Ismalakoi.jpg',
    twitter: 'https://x.com/Ismalakoi',
    instagram: 'https://www.instagram.com/ismalakoi1/',
  },
  {
    nome: 'PEU',
    img: '/creators/Peu.jpg',
    twitter: 'https://x.com/peuzinholol',
    instagram: 'https://www.instagram.com/peuzinholol/',
  },
  // adicione mais creators conforme quiser
];

export default function Creators() {
  const [imagemAberta, setImagemAberta] = useState(null);

  return (
    <div className="pagina-creators">
      <h1>Creators da Matilha</h1>

      <section>
        <div className="jogadores">
          {creators.map((creator, idx) => (
            <div key={idx} className="jogador">
              <img
                src={creator.img}
                alt={creator.nome}
                onClick={() => setImagemAberta(creator.img)}
              />
              <span>{creator.nome}</span>
              <div className="social-buttons">
                {creator.twitter && (
                  <a
                    href={creator.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <img src="/icons/x.png" alt="Twitter" />
                  </a>
                )}
                {creator.instagram && (
                  <a
                    href={creator.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <img src="/icons/instagram.png" alt="Instagram" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {imagemAberta && (
        <div className="modal" onClick={() => setImagemAberta(null)}>
          <img src={imagemAberta} alt="Imagem ampliada" />
        </div>
      )}
    </div>
  );
}
