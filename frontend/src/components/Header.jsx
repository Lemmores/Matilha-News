import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [adminLogado, setAdminLogado] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    campeonatos: false,
    eventos: false,
    torneios: false,
    painelAdmin: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const verificarLogin = () => {
      const token = localStorage.getItem("token");
      setAdminLogado(!!token);
    };
    verificarLogin();
    window.addEventListener("adminLogado", verificarLogin);
    return () => window.removeEventListener("adminLogado", verificarLogin);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuAberto(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation(); // evita disparar eventos globais
    setMenuAberto(!menuAberto);
  };

  const toggleDropdownDesktop = (nome) => {
    setDropdownAberto(dropdownAberto === nome ? null : nome);
  };

  const toggleDropdownMobile = (nome, e) => {
    e.stopPropagation(); // evita fechar menu
    setMobileDropdowns(prev => ({ ...prev, [nome]: !prev[nome] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAdminLogado(false);
    window.dispatchEvent(new Event("adminLogado"));
    navigate("/");
  };

  const DropdownButton = ({ label, id }) => (
    <button className="dropdown-toggle" onClick={() => toggleDropdownDesktop(id)}>
      {label} {dropdownAberto === id ? '▲' : '▼'}
    </button>
  );

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <img src="/logo2.png" alt="Logo Matilha News" />
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="nav-desktop">
          <div className="nav-item">
            <Link to="/noticias">Notícias</Link>
          </div>

          <div className="nav-item">
            <DropdownButton label="Campeonatos" id="campeonatos" />
            {dropdownAberto === 'campeonatos' && (
              <div className="dropdown">
                <Link to="/ltasul">LTA SUL</Link>
                <Link to="/circuito">CIRCUITO DESAFIANTE</Link>
                <Link to="/cs2">CS2</Link>
              </div>
            )}
          </div>

          <div className="nav-item">
            <Link to="/creators">Creators</Link>
          </div>

          <div className="nav-item">
            <DropdownButton label="Eventos" id="eventos" />
            {dropdownAberto === 'eventos' && (
              <div className="dropdown">
                <Link to="/watchparties">WATCH PARTIES</Link>
              </div>
            )}
          </div>

          <div className="nav-item">
            <DropdownButton label="Torneios da Matilha" id="torneios" />
            {dropdownAberto === 'torneios' && (
              <div className="dropdown">
                <Link to="/matilhatactics">MATILHA TACTICS</Link>
              </div>
            )}
          </div>

          <div className="nav-item">
            <Link to="/contato">Contato</Link>
          </div>

          {!adminLogado && (
            <div className="nav-item">
              <Link to="/login">Login</Link>
            </div>
          )}

          {adminLogado && (
            <>
              <div className="nav-item">
                <DropdownButton label="Painel Administrativo" id="painel-admin" />
                {dropdownAberto === 'painel-admin' && (
                  <div className="dropdown">
                    <Link to="/nova-noticia">Nova Notícia</Link>
                    <Link to="/gerenciar-noticia">Gerenciar Notícia</Link>
                    <Link to="/nova-watchparty">Nova Watch Party</Link>
                    <Link to="/gerenciar-wp">Gerenciar Watch Parties</Link>
                    <Link to="/nova-agenda">Nova Agenda</Link>
                    <Link to="/gerenciar-agenda">Gerenciar Agenda</Link>
                    <Link to="/novo-conteudo">Novo Conteúdo Creators</Link>
                    <Link to="/gerenciar-conteudo">Gerenciar Conteúdos Creators</Link>
                  </div>
                )}
              </div>
              <div className="nav-item">
                <button className="dropdown-toggle" onClick={handleLogout}>Sair</button>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Botão menu mobile */}
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>

      {/* Menu Mobile */}
      <nav className={`nav-mobile ${menuAberto ? 'ativo' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="nav-item">
          <Link to="/noticias" className="link-mobile" onClick={() => setMenuAberto(false)}>Notícias</Link>
        </div>

        <div className="nav-item">
          <button
            className="dropdown-toggle"
            onClick={(e) => toggleDropdownMobile('campeonatos', e)}
          >
            Campeonatos {mobileDropdowns.campeonatos ? '▲' : '▼'}
          </button>
          {mobileDropdowns.campeonatos && (
            <div className="dropdown">
              <Link to="/ltasul" onClick={() => setMenuAberto(false)}>LTA SUL</Link>
              <Link to="/circuito" onClick={() => setMenuAberto(false)}>CIRCUITO DESAFIANTE</Link>
              <Link to="/cs2" onClick={() => setMenuAberto(false)}>CS2</Link>
            </div>
          )}
        </div>

        <div className="nav-item">
          <Link to="/creators" className="link-mobile" onClick={() => setMenuAberto(false)}>Creators</Link>
        </div>

        <div className="nav-item">
          <button
            className="dropdown-toggle"
            onClick={(e) => toggleDropdownMobile('eventos', e)}
          >
            Eventos {mobileDropdowns.eventos ? '▲' : '▼'}
          </button>
          {mobileDropdowns.eventos && (
            <div className="dropdown">
              <Link to="/watchparties" onClick={() => setMenuAberto(false)}>WATCH PARTIES</Link>
            </div>
          )}
        </div>

        <div className="nav-item">
          <button
            className="dropdown-toggle"
            onClick={(e) => toggleDropdownMobile('torneios', e)}
          >
            Torneios da Matilha {mobileDropdowns.torneios ? '▲' : '▼'}
          </button>
          {mobileDropdowns.torneios && (
            <div className="dropdown">
              <Link to="/matilhatactics" onClick={() => setMenuAberto(false)}>MATILHA TACTICS</Link>
            </div>
          )}
        </div>

        <div className="nav-item">
          <Link to="/contato" className="link-mobile" onClick={() => setMenuAberto(false)}>Contato</Link>
        </div>

        {!adminLogado && (
          <div className="nav-item">
            <Link to="/login" className="link-mobile" onClick={() => setMenuAberto(false)}>Login</Link>
          </div>
        )}

        {adminLogado && (
          <>
            <div className="nav-item">
              <button
                className="dropdown-toggle"
                onClick={(e) => toggleDropdownMobile('painelAdmin', e)}
              >
                Painel Administrativo {mobileDropdowns.painelAdmin ? '▲' : '▼'}
              </button>
              {mobileDropdowns.painelAdmin && (
                <div className="dropdown">
                  <Link to="/nova-noticia" onClick={() => setMenuAberto(false)}>Nova Notícia</Link>
                  <Link to="/gerenciar-noticia" onClick={() => setMenuAberto(false)}>Gerenciar Notícia</Link>
                  <Link to="/nova-watchparty" onClick={() => setMenuAberto(false)}>Nova Watch Party</Link>
                  <Link to="/gerenciar-wp" onClick={() => setMenuAberto(false)}>Gerenciar Watch Parties</Link>
                  <Link to="/nova-agenda" onClick={() => setMenuAberto(false)}>Nova Agenda</Link>
                  <Link to="/gerenciar-agenda" onClick={() => setMenuAberto(false)}>Gerenciar Agenda</Link>
                  <Link to="/novo-conteudo" onClick={() => setMenuAberto(false)}>Novo Conteúdo Creators</Link>
                  <Link to="/gerenciar-conteudo" onClick={() => setMenuAberto(false)}>Gerenciar Conteúdos Creators</Link>
                </div>
              )}
            </div>

            <div className="nav-item">
              <button className="dropdown-toggle" onClick={handleLogout}>Sair</button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
