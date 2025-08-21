import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [adminLogado, setAdminLogado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAdminLogado(false);
    window.dispatchEvent(new Event("adminLogado"));
    navigate("/");
    setMenuAberto(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <img src="/logo2.png" alt="Matilha News" />
          </Link>
        </div>

        <button
          className={`menu-toggle ${menuAberto ? 'ativo' : ''}`}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Menu"
        >
          <span className="hamburger"></span>
        </button>

        <nav className={`nav ${menuAberto ? 'ativo' : ''}`}>
          <Link to="/noticias" onClick={() => setMenuAberto(false)}>Notícias</Link>

          <details>
            <summary>Campeonatos</summary>
            <Link to="/ltasul" onClick={() => setMenuAberto(false)}>LTA SUL</Link>
            <Link to="/circuito" onClick={() => setMenuAberto(false)}>CIRCUITO DESAFIANTE</Link>
            <Link to="/cs2" onClick={() => setMenuAberto(false)}>CS2</Link>
          </details>

          <Link to="/creators" onClick={() => setMenuAberto(false)}>Creators</Link>

          <details>
            <summary>Eventos</summary>
            <Link to="/watchparties" onClick={() => setMenuAberto(false)}>WATCH PARTIES</Link>
          </details>

          <details>
            <summary>Torneios da Matilha</summary>
            <Link to="/matilhatactics" onClick={() => setMenuAberto(false)}>MATILHA TACTICS</Link>
          </details>

          <Link to="/contato" onClick={() => setMenuAberto(false)}>Contato</Link>

          {!adminLogado && <Link to="/login" onClick={() => setMenuAberto(false)}>Login</Link>}

          {adminLogado && (
            <details>
              <summary>Painel Administrativo</summary>
              <Link to="/nova-noticia" onClick={() => setMenuAberto(false)}>Nova Notícia</Link>
              <Link to="/gerenciar-noticia" onClick={() => setMenuAberto(false)}>Gerenciar Notícia</Link>
              <Link to="/nova-watchparty" onClick={() => setMenuAberto(false)}>Nova Watch Party</Link>
              <Link to="/gerenciar-wp" onClick={() => setMenuAberto(false)}>Gerenciar Watch Parties</Link>
              <Link to="/nova-agenda" onClick={() => setMenuAberto(false)}>Nova Agenda</Link>
              <Link to="/gerenciar-agenda" onClick={() => setMenuAberto(false)}>Gerenciar Agenda</Link>
              <Link to="/novo-conteudo" onClick={() => setMenuAberto(false)}>Novo Conteúdo Creators</Link>
              <Link to="/gerenciar-conteudo" onClick={() => setMenuAberto(false)}>Gerenciar Conteúdos Creators</Link>
              <button onClick={handleLogout} className="sair">Sair</button>
            </details>
          )}
        </nav>
      </div>
    </header>
  );
}
