import React, {useState} from 'react';
import HomeNavbar from './components/Navbar.js';
import { Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.jsx';
import Contact from './components/Contact.jsx';
import NewPost from './components/NewPost.jsx';
import EditPost from './components/EditPost.jsx';
import Details from './components/Details.jsx';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';
import ForSale from './components/ForSale.jsx';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };
  const editPost = (post) => {
    setPosts([...posts, post]);
  }
  return (
    <div className="App">
      <HomeNavbar />
      <main>
      <Routes>
        <Route path="/" element={<Home posts={posts}/>} />
        <Route path="/forsale" element={<ForSale posts={posts}/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/newpost" element={<NewPost addPost={addPost}/>} />
        <Route path="/editpost" element={<EditPost editPost={editPost}/>} />
        <Route path="post/:slug" element={<Details posts={posts}/>} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
