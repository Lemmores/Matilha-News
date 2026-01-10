import { useState, useEffect } from 'react';
import './Creators.css';

const creators = [
  { nome: 'MEDU', img: '/creators/Medu.jpg', twitter: 'https://x.com/medulol1', instagram: 'https://www.instagram.com/medulol1/' },
  { nome: 'PEU', img: '/creators/Peu.jpg', twitter: 'https://x.com/peuzinholol', instagram: 'https://www.instagram.com/peuzinholol/' },
  { nome: 'DYEN', img: '/creators/Dyen.jpg', twitter: 'https://x.com/DyenffnyM', instagram: 'https://www.instagram.com/dyenffnym/' },
  { nome: 'IASSER', img: '/creators/Iasser.jpg', twitter: 'https://x.com/iasserzinlol', instagram: 'https://www.instagram.com/iasserzinlol/' },
  { nome: 'AMMY', img: '/creators/Ammy.jpg', twitter: 'https://x.com/ammyzitta', instagram: 'https://www.instagram.com/ammyzitta/' },
  { nome: 'DERSIN', img: '/creators/Dersin.jpg', twitter: 'https://x.com/dersin2k', instagram: 'https://www.instagram.com/dersin2k' },
  { nome: 'ISAC', img: '/creators/Isac.jpg', twitter: 'https://x.com/isac_lemus', instagram: 'https://www.instagram.com/isac.lemus/' },
  { nome: 'JOÃO DIAS', img: '/creators/João Dias.jpg', twitter: 'https://x.com/jdiasss_', instagram: 'https://www.instagram.com/jdiasss_/' },
  { nome: 'IONIAN', img: '/creators/Ionian.jpg', twitter: 'https://x.com/ionianzin', instagram: 'https://www.instagram.com/ionianzin/' },
  { nome: 'JM', img: '/creators/JM.jpg', twitter: 'https://x.com/JMdeck_', instagram: 'https://www.instagram.com/jmdeck_' },
  { nome: 'ANINHA', img: '/creators/Aninha.jpg', twitter: 'https://x.com/aninhamagica', instagram: 'https://www.instagram.com/aninhamagica' },
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
    const limpo = url.replace(/\/$/, ''); 
    return `${limpo}/embed`;
  };

  return (
    <div className="pagina-creators">
      <header className="header-creators">
        <h1>Creators da Matilha</h1>
        <p className="subtitle">O ELITE SQUAD DA RED CANIDS</p>
      </header>

      <section className="creators-section">
        <div className="creators-compact-grid">
          {creators.map((creator, idx) => (
            <div key={idx} className="mini-creator-card">
              <div className="mini-image-container">
                <img
                  src={creator.img}
                  alt={creator.nome}
                  loading="lazy" 
                  onClick={() => setImagemAberta(creator.img)}
                />
                {/* Overlay visível no hover (PC) */}
                <div className="mini-social-overlay hover-only">
                  {creator.twitter && (
                    <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/x.png" alt="X" />
                    </a>
                  )}
                  {creator.instagram && (
                    <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/instagram.png" alt="Instagram" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mini-creator-footer">
                <span className="mini-creator-name">{creator.nome}</span>
                <span className="mini-creator-role">CONTENT CREATOR</span>
                
                {/* Redes visíveis sempre (Mobile) */}
                <div className="mini-social-overlay mobile-only">
                  {creator.twitter && (
                    <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/x.png" alt="X" />
                    </a>
                  )}
                  {creator.instagram && (
                    <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/instagram.png" alt="Instagram" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {imagemAberta && (
        <div className="modal-overlay" onClick={() => setImagemAberta(null)}>
          <div className="modal-content">
            <img src={imagemAberta} alt="Zoom" />
            <button className="close-modal" onClick={() => setImagemAberta(null)}>X</button>
          </div>
        </div>
      )}

      <section className="feed-section">
        <h2 className="section-title">Últimos Conteúdos</h2>

        <div className="filter-bar">
          {nomesCreators.map((nome) => (
            <button
              key={nome}
              className={filtro === nome ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFiltro(nome)}
            >
              {nome}
            </button>
          ))}
        </div>

        <div className="feed-grid">
          {conteudosFiltrados.length === 0 && (
            <p className="no-content">Aguardando novos conteúdos da matilha...</p>
          )}
          
          {conteudosFiltrados.map((conteudo) => (
            <div key={conteudo._id} className="feed-card">
              <div className="media-container">
                {conteudo.tipo === 'reel' && (
                  <iframe
                    src={ajustarUrlReel(conteudo.url)}
                    title={`Reel de ${conteudo.creator}`}
                    allowFullScreen
                    scrolling="no"
                    loading="lazy"
                    className="iframe-media reel"
                  ></iframe>
                )}
                {conteudo.tipo === 'tiktok' && (
                  <iframe
                    src={conteudo.url}
                    title={`TikTok de ${conteudo.creator}`}
                    allowFullScreen
                    scrolling="no"
                    loading="lazy"
                    className="iframe-media tiktok"
                  ></iframe>
                )}
              </div>
             
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}