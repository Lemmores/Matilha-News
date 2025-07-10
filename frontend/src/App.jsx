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
import GerenciarNoticia from './pages/GerenciarNoticia';
import EditarNoticia from './components/EditarNoticia';
import NovaWatchParty from './components/NovaWatchParty';
import GerenciarWatchParties from './pages/GerenciarWatchParties';
import EditarWatchParty from './components/EditarWatchParty';
import NovaAgenda from './components/NovaAgenda';
import GerenciarAgenda from './pages/GerenciarAgenda';
import EditarAgenda from './components/EditarAgenda';
import CSPage from './pages/CSPage';

export default function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/gerenciar-noticia" element={<GerenciarNoticia />} />
         <Route path="/login" element={<Login />} />
         <Route path="/watchparties" element={<WatchParties />} />
         <Route path="/matilhatactics" element={<MatilhaTactics />} />
         <Route path="/ltasul" element={<LtaSulPage/>} />
         <Route path="/circuito" element={<CircuitoPage/>} />
         <Route path="/contato" element={<Contato />} />
         <Route path="/noticia/:id" element={<NoticiaDetalhada />} />
         <Route path="/noticias" element={<Noticias />} />
         <Route path="/nova-noticia" element={<NovaNoticia />} />
         <Route path="/editar-noticia/:id" element={<EditarNoticia />} />
         <Route path="/nova-watchparty" element={<NovaWatchParty />} />
         <Route path="/gerenciar-wp" element={<GerenciarWatchParties />} />
         <Route path="/editar-watchparty/:id" element={<EditarWatchParty />} />
         <Route path="/nova-agenda" element={<NovaAgenda />} />
         <Route path="/gerenciar-agenda" element={<GerenciarAgenda />} />
         <Route path="/editar-agenda/:id" element={<EditarAgenda />} />
         <Route path="/cs2" element={<CSPage/>} />


        
      </Routes>
      
      <Footer />
    </Router>
  );
}
