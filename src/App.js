import HomeNavbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import NewPost from './components/NewPost.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/newpost" element={<NewPost/>} />
      </Routes>
    </div>
  );
}

export default App;
