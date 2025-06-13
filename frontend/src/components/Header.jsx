import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(null);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    setDropdownAberto(null);
  };

  const toggleDropdown = (nome) => {
    setDropdownAberto(dropdownAberto === nome ? null : nome);
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
      </nav>
    </header>
  );
}
