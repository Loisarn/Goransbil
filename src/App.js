import HomeNavbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import NewPost from './components/NewPost.jsx';
import Details from './components/Details.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/newpost" element={<NewPost/>} />
        <Route path="post/:slug" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
