import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo2.png" alt="Logo Matilha News" />
      </div>
      <nav className="nav">
        <div className="nav-item">
          <a href="#">Início</a>
        </div>
        <div className="nav-item">
          <a href="#">Campeonatos</a>
          <div className="dropdown">
            <a href="#">LTA SUL</a>
            <a href="#">CIRCUITO DESAFIANTE</a>
            <a href="#">CS2</a>
            <a href="#">VALORANT</a>
          </div>
        </div>
        <div className="nav-item">
          <a href="#">Eventos</a>
          <div className="dropdown">
            <a href="#">WATCH PARTIES</a>
          </div>
        </div>

          <div className="nav-item">
          <a href="#">Torneios da Matilha</a>
          <div className="dropdown">
            <a href="#">RED CANUDOS 2025</a>
            <a href="#">TFT DA MATILHA 1º EDIÇÃO</a>
            <a href="#">OLIMPÍADAS DA MATILHA 2025</a>
          </div>
        </div>

        <div className="nav-item">
          <a href="#">Contato</a>
        </div>
      </nav>
    </header>
  )
}
