import './App.css';
import Home from './pages/Home/Home';
import Calculo from './pages/Calculo/Calculo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculo" element={<Calculo />} />
      </Routes>
    </Router>
  );
}

export default App;
