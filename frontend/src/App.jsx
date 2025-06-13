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
import Noticia from './pages/Noticias/Noticia';
import Noticia2 from './pages/Noticias/Noticia2'
import Noticia3 from './pages/Noticias/Noticia3'
import Noticia4 from './pages/Noticias/Noticia4'
import Noticia5 from './pages/Noticias/Noticia5'
import Noticia6 from './pages/Noticias/Noticia6'
import Noticia7 from './pages/Noticias/Noticia7'
import Noticia8 from './pages/Noticias/Noticia8'
import Noticia9 from './pages/Noticias/Noticia9'
import Noticia10 from './pages/Noticias/Noticia10';
import Noticia11 from './pages/Noticias/Noticia11';
import Noticia12 from './pages/Noticias/Noticia12';
import NovaNoticia from './components/NovaNoticia';
import NoticiaDetalhada from './pages/Noticias/NoticiaDetalhada';



export default function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/noticia/1" element={<Noticia />} />
         <Route path="/noticia/2" element={<Noticia2 />} />
         <Route path="/noticia/3" element={<Noticia3 />} />
         <Route path="/noticia/4" element={<Noticia4 />} />
         <Route path="/noticia/5" element={<Noticia5 />} />
         <Route path="/noticia/6" element={<Noticia6 />} />
         <Route path="/noticia/7" element={<Noticia7 />} />
         <Route path="/noticia/8" element={<Noticia8 />} />
         <Route path="/noticia/9" element={<Noticia9 />} />
         <Route path="/noticia/10" element={<Noticia10 />} />
         <Route path="/noticia/11" element={<Noticia11 />} />
          <Route path="/noticia/12" element={<Noticia12 />} />
         <Route path="/watchparties" element={<WatchParties />} />
         <Route path="/matilhatactics" element={<MatilhaTactics />} />
         <Route path="/ltasul" element={<LtaSulPage/>} />
         <Route path="/circuito" element={<CircuitoPage/>} />
         <Route path="/contato" element={<Contato />} />
         <Route path="/nova-noticia" element={<NovaNoticia />} />
         <Route path="/noticia/:id" element={<NoticiaDetalhada />} />


        
      </Routes>
      
      <Footer />
    </Router>
  );
}
