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

    return () => {
      window.removeEventListener("adminLogado", verificarLogin);
    };
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

  const DropdownButton = ({ label, id }) => (
    <button className="dropdown-toggle" onClick={() => toggleDropdown(id)}>
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
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>

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
                <Link to="#">CS2</Link>
                <Link to="#">VALORANT</Link>
              </div>
            )}
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
                <Link to="#">RED CANUDOS 2025</Link>
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
                {/* Dropdown do Painel Administrativo */}
                <DropdownButton label="Painel Administrativo" id="painel-admin" />
                {dropdownAberto === 'painel-admin' && (
                  <div className="dropdown">
                    <Link to="/nova-noticia">Nova Notícia</Link>
                    <Link to="/gerenciar-noticia">Gerenciar Notícia</Link>
                    <Link to="/nova-watchparty">Nova Watch Party</Link>
                    <Link to="/gerenciar-wp">Gerenciar Watch Parties</Link>
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

      {/* Menu Mobile */}
      <nav className={`nav-mobile ${menuAberto ? 'ativo' : ''}`}>
        <div className="nav-item">
          <Link to="/noticias">Notícias</Link>
        </div>
        <div className="nav-item">
          <DropdownButton label="Campeonatos" id="campeonatos-mobile" />
          {dropdownAberto === 'campeonatos-mobile' && (
            <div className="dropdown">
              <Link to="/ltasul">LTA SUL</Link>
              <Link to="/circuito">CIRCUITO DESAFIANTE</Link>
              <Link to="#">CS2</Link>
              <Link to="#">VALORANT</Link>
            </div>
          )}
        </div>
        <div className="nav-item">
          <DropdownButton label="Eventos" id="eventos-mobile" />
          {dropdownAberto === 'eventos-mobile' && (
            <div className="dropdown">
              <Link to="/watchparties">WATCH PARTIES</Link>
            </div>
          )}
        </div>
        <div className="nav-item">
          <DropdownButton label="Torneios da Matilha" id="torneios-mobile" />
          {dropdownAberto === 'torneios-mobile' && (
            <div className="dropdown">
              <Link to="/matilhatactics">MATILHA TACTICS</Link>
              <Link to="#">RED CANUDOS 2025</Link>
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
              {/* Dropdown do Painel Administrativo Mobile */}
              <DropdownButton label="Painel Administrativo" id="painel-admin-mobile" />
              {dropdownAberto === 'painel-admin-mobile' && (
                <div className="dropdown">
                  <Link to="/nova-noticia">Nova Notícia</Link>
                  <Link to="/gerenciar-noticia">Gerenciar Notícia</Link>
                  <Link to="/nova-watchparty">Nova Watch Party</Link>
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
