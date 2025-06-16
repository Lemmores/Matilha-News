import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import WatchParties from './components/WatchParties';
import MatilhaTactics from './components/MatilhaTactics';
import LtaSulPage from './pages/LtaSulPage';
import CircuitoPage from './pages/CircuitoPage';
import Contato from './components/Contato';
import NovaNoticia from './components/NovaNoticia';
import NoticiaDetalhada from './pages/Noticias/NoticiaDetalhada';
import Login from './pages/Login';
import PainelAdmin from './pages/PainelAdmin';

export default function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/painel" element={<PainelAdmin />} />
          <Route path="/login" element={<Login />} />
         <Route path="/watchparties" element={<WatchParties />} />
         <Route path="/matilhatactics" element={<MatilhaTactics />} />
         <Route path="/ltasul" element={<LtaSulPage/>} />
         <Route path="/circuito" element={<CircuitoPage/>} />
         <Route path="/contato" element={<Contato />} />
         <Route path="/noticia/:id" element={<NoticiaDetalhada />} />
         <Route path="/noticias" element={<Noticias />} />
        <Route path="/nova-noticia" element={<NovaNoticia />} />


        
      </Routes>
      
      <Footer />
    </Router>
  );
}
