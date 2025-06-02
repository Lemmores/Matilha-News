import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Noticia from './pages/Noticia'; // você precisa criar esse arquivo
import Noticia2 from './pages/Noticia2';
import Noticia3 from './pages/Noticia3';
import Noticia4 from './pages/Noticia4';
import Noticia5 from './pages/Noticia5';
import Noticia6 from './pages/Noticia6';
import WatchParties from './components/WatchParties';
import MatilhaTactics from './components/MatilhaTactics';


export default function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticia/1" element={<Noticia />} />
         <Route path="/noticia/2" element={<Noticia2 />} />
         <Route path="/noticia/3" element={<Noticia3 />} />
         <Route path="/noticia/4" element={<Noticia4 />} />
         <Route path="/noticia/5" element={<Noticia5 />} />
         <Route path="/noticia/6" element={<Noticia6 />} />
         <Route path="/watchparties" element={<WatchParties />} />
         <Route path="/matilhatactics" element={<MatilhaTactics />} />

      </Routes>
      
      <Footer />
    </Router>
  );
}
