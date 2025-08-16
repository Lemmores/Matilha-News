import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [adminLogado, setAdminLogado] = useState(false);
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
      if (window.innerWidth > 768) {
        setMenuAberto(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    setDropdownAberto(null);
  };

  const toggleDropdown = (nome) => {
    setDropdownAberto(dropdownAberto === nome ? null : nome);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAdminLogado(false);
    window.dispatchEvent(new Event("adminLogado"));
    navigate("/");
  };

  const Dropdown = ({ label, id, children }) => (
    <div className={`dropdown ${dropdownAberto === id ? 'open' : ''}`}>
      <button className="dropdown-toggle" onClick={() => toggleDropdown(id)}>
        {label} {dropdownAberto === id ? '▲' : '▼'}
      </button>
      <div className="dropdown-content">{children}</div>
    </div>
  );

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/logo2.png" alt="Logo Matilha News" />
        </Link>
      </div>

      {/* Menu Desktop */}
      <nav className="nav-desktop">
        <Link to="/noticias">Notícias</Link>

        <Dropdown label="Campeonatos" id="campeonatos">
          <Link to="/ltasul">LTA SUL</Link>
          <Link to="/circuito">CIRCUITO DESAFIANTE</Link>
          <Link to="/cs2">CS2</Link>
        </Dropdown>

        <Link to="/creators">Creators</Link>

        <Dropdown label="Eventos" id="eventos">
          <Link to="/watchparties">WATCH PARTIES</Link>
        </Dropdown>

        <Dropdown label="Torneios da Matilha" id="torneios">
          <Link to="/matilhatactics">MATILHA TACTICS</Link>
        </Dropdown>

        <Link to="/contato">Contato</Link>

        {!adminLogado && <Link to="/login">Login</Link>}

        {adminLogado && (
          <>
            <Dropdown label="Painel Administrativo" id="painel-admin">
              <Link to="/nova-noticia">Nova Notícia</Link>
              <Link to="/gerenciar-noticia">Gerenciar Notícia</Link>
              <Link to="/nova-watchparty">Nova Watch Party</Link>
              <Link to="/gerenciar-wp">Gerenciar Watch Parties</Link>
              <Link to="/nova-agenda">Nova Agenda</Link>
              <Link to="/gerenciar-agenda">Gerenciar Agenda</Link>
              <Link to="/novo-conteudo">Novo Conteúdo Creators</Link>
              <Link to="/gerenciar-conteudo">Gerenciar Conteúdos Creators</Link>
            </Dropdown>
            <button className="dropdown-toggle" onClick={handleLogout}>Sair</button>
          </>
        )}
      </nav>

      {/* Botão do menu mobile */}
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>

      {/* Menu Mobile */}
      <nav className={`nav-mobile ${menuAberto ? 'active' : ''}`}>
        <Link to="/noticias" onClick={() => setMenuAberto(false)}>Notícias</Link>

        <details>
          <summary>Campeonatos</summary>
          <div className="dropdown-content">
            <Link to="/ltasul">LTA SUL</Link>
            <Link to="/circuito">CIRCUITO DESAFIANTE</Link>
            <Link to="/cs2">CS2</Link>
          </div>
        </details>

        <Link to="/creators" onClick={() => setMenuAberto(false)}>Creators</Link>

        <details>
          <summary>Eventos</summary>
          <div className="dropdown-content">
            <Link to="/watchparties">WATCH PARTIES</Link>
          </div>
        </details>

        <details>
          <summary>Torneios da Matilha</summary>
          <div className="dropdown-content">
            <Link to="/matilhatactics">MATILHA TACTICS</Link>
          </div>
        </details>

        <Link to="/contato" onClick={() => setMenuAberto(false)}>Contato</Link>

        {!adminLogado && <Link to="/login">Login</Link>}

        {adminLogado && (
          <>
            <details>
              <summary>Painel Administrativo</summary>
              <div className="dropdown-content">
                <Link to="/nova-noticia">Nova Notícia</Link>
                <Link to="/gerenciar-noticia">Gerenciar Notícia</Link>
                <Link to="/nova-watchparty">Nova Watch Party</Link>
                <Link to="/gerenciar-wp">Gerenciar Watch Parties</Link>
                <Link to="/nova-agenda">Nova Agenda</Link>
                <Link to="/gerenciar-agenda">Gerenciar Agenda</Link>
                <Link to="/novo-conteudo">Novo Conteúdo Creators</Link>
                <Link to="/gerenciar-conteudo">Gerenciar Conteúdos Creators</Link>
              </div>
            </details>
            <button className="dropdown-toggle" onClick={handleLogout}>Sair</button>
          </>
        )}
      </nav>
    </header>
  );
}
