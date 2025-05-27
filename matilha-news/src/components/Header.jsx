import "./Header.css";
import logo from "../assets/red-logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt="Matilha News Logo" className="logo" />
        <nav className="nav">
          <a href="#">Início</a>
          <a href="#">Notícias</a>
          <a href="#">Competições</a>
          <a href="#">Eventos</a>
          <a href="#">Sobre</a>
        </nav>
      </div>
    </header>
  );
}
