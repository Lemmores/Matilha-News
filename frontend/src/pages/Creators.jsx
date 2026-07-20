import { useState, useEffect } from 'react';
import './Creators.css';

const creators = [

 
  { nome: 'DYEN', img: '/creators/Dyen.webp', twitter: 'https://x.com/DyenffnyM', instagram: 'https://www.instagram.com/dyenffnym/' },
  { nome: 'IASSER', img: '/creators/Iasser.webp', twitter: 'https://x.com/iasserzinlol', instagram: 'https://www.instagram.com/iasserzinlol/' },
  { nome: 'AMMY', img: '/creators/Ammy.webp', twitter: 'https://x.com/ammyzitta', instagram: 'https://www.instagram.com/ammyzitta/' },
  { nome: 'JOÃO DIAS', img: '/creators/João Dias.webp', twitter: 'https://x.com/jdiasss_', instagram: 'https://www.instagram.com/jdiasss_/' },
  { nome: 'ANINHA', img: '/creators/Aninha.webp', twitter: 'https://x.com/aninhamagica', instagram: 'https://www.instagram.com/aninhamagica' },
];

export default function Creators() {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [conteudos, setConteudos] = useState([]);
  const [filtro, setFiltro] = useState('TUDO');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const conteudosPorPagina = 3;

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

  const handleFiltro = (nome) => {
    setFiltro(nome);
    setPaginaAtual(1);
  };

  const nomesCreators = ['TUDO', ...creators.map(c => c.nome)];
  
  const conteudosFiltradosTotal = filtro === 'TUDO'
    ? conteudos
    : conteudos.filter(c => c.creator === filtro);

  const totalPaginas = Math.ceil(conteudosFiltradosTotal.length / conteudosPorPagina);
  const conteudosExibidos = conteudosFiltradosTotal.slice(
    (paginaAtual - 1) * conteudosPorPagina,
    paginaAtual * conteudosPorPagina
  );

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
                  width="180"   // Adicione o tamanho aproximado do card
                  height="200"  // Adicione o tamanho aproximado do card
                  // Carrega as 4 primeiras imagens imediatamente (LCP), o resto em lazy
                  loading={idx < 4 ? "eager" : "lazy"}
                  // Dá prioridade máxima para os primeiros da lista
                  fetchPriority={idx < 4 ? "high" : "low"}
                  // Decodificação assíncrona para não travar o scroll
                  decoding="async"
                  onClick={() => setImagemAberta(creator.img)}
                />
                <div className="mini-social-overlay hover-only">
                  {creator.twitter && (
                    <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/x.png" alt="X" loading="lazy" />
                    </a>
                  )}
                  {creator.instagram && (
                    <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/instagram.png" alt="Instagram" loading="lazy" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mini-creator-footer">
                <span className="mini-creator-name">{creator.nome}</span>
                <span className="mini-creator-role">CONTENT CREATOR</span>
                <div className="mini-social-overlay mobile-only">
                  {creator.twitter && (
                    <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/x.png" alt="X" loading="lazy" />
                    </a>
                  )}
                  {creator.instagram && (
                    <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="mini-social-icon">
                      <img src="/icons/instagram.png" alt="Instagram" loading="lazy" />
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
              onClick={() => handleFiltro(nome)}
            >
              {nome}
            </button>
          ))}
        </div>

        <div className="feed-grid">
          {conteudosExibidos.length === 0 && (
            <p className="no-content">Aguardando novos conteúdos da matilha...</p>
          )}
          
          {conteudosExibidos.map((conteudo) => (
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

        {totalPaginas > 1 && (
          <div className="paginacao-creators">
            <button 
              onClick={() => setPaginaAtual(p => p - 1)} 
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>
            <span className="page-indicator">{paginaAtual} / {totalPaginas}</span>
            <button 
              onClick={() => setPaginaAtual(p => p + 1)} 
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>
          </div>
        )}
      </section>
    </div>
  );
}