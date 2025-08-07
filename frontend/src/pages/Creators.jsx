import { useState, useEffect } from 'react';
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
  {
    nome: 'DYEN',
    img: '/creators/Dyen.jpg',
    twitter: 'https://x.com/DyenffnyM',
    instagram: 'https://www.instagram.com/dyenffnym/',
  },
  {
    nome: 'IASSER',
    img: '/creators/Iasser.jpg',
    twitter: 'https://x.com/iasserzinlol',
    instagram: 'https://www.instagram.com/iasserzinlol/',
  },
  {
    nome: 'AMMY',
    img: '/creators/Ammy.jpg',
    twitter: 'https://x.com/ammyzitta',
    instagram: 'https://www.instagram.com/ammyzitta/',
  },
  {
    nome: 'ISAC',
    img: '/creators/Isac.jpg',
    twitter: 'https://x.com/isac_lemus',
    instagram: 'https://www.instagram.com/isac.lemus/',
  },
  {
    nome: 'JOÃO DIAS',
    img: '/creators/João Dias.jpg',
    twitter: 'https://x.com/jdiasss_',
    instagram: 'https://www.instagram.com/jdiasss_/',
  },
];

export default function Creators() {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [conteudos, setConteudos] = useState([]);
  const [filtro, setFiltro] = useState('TUDO');

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/conteudos-creators`)
      .then(res => res.json())
      .then(data => {
        const ordenados = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setConteudos(ordenados);
      })
      .catch(err => console.error('Erro ao carregar conteúdos:', err));
  }, [API_URL]);

  const nomesCreators = ['TUDO', ...creators.map(c => c.nome)];
  const conteudosFiltrados = filtro === 'TUDO'
    ? conteudos
    : conteudos.filter(c => c.creator === filtro);

  const ajustarUrlReel = (url) => {
    const limpo = url.replace(/\/$/, ''); // remove barra final se tiver
    return `${limpo}/embed`;
  };

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

      {/* NOVOS CONTEÚDOS */}
      <section className="novos-conteudos-section">
        <h2>Novos Conteúdos</h2>

        <div className="filtros-creators">
          {nomesCreators.map((nome) => (
            <button
              key={nome}
              className={filtro === nome ? 'ativo' : ''}
              onClick={() => setFiltro(nome)}
            >
              {nome}
            </button>
          ))}
        </div>

        <div className="lista-conteudos">
          {conteudosFiltrados.length === 0 && <p>Nenhum conteúdo para mostrar.</p>}
          {conteudosFiltrados.map((conteudo) => (
            <div key={conteudo._id} className="card-conteudo">
              {conteudo.tipo === 'reel' && (
                <iframe
                  src={ajustarUrlReel(conteudo.url)}
                  title={`Conteúdo de ${conteudo.creator}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '600px',
                    border: 'none',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                ></iframe>
              )}
              {conteudo.tipo === 'tiktok' && (
                <iframe
                  src={conteudo.url}
                  title={`Conteúdo de ${conteudo.creator}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '320px', // igual à altura das fotos dos creators
                    border: 'none',
                    borderRadius: '10px 10px 0 0',
                    overflow: 'hidden',
                    scrolling: 'no',
                  }}
                ></iframe>
              )}
              <div className="info">{conteudo.creator}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
