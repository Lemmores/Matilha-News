import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Noticia from './pages/Noticia'; // você precisa criar esse arquivo

export default function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticia/1" element={<Noticia />} />

      </Routes>
      
      <Footer />
    </Router>
  );
}
