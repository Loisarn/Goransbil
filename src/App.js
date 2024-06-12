import HomeNavbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
