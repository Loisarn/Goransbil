import {FaBars, FaTimes, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {useRef, useState} from 'react';
import { Nav, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

function HomeNavbar() {
  const navRef = useRef();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const handleLogout = () => {
     localStorage.removeItem("token");
     navigate("/login");
   };

   const handleLogin = () => {
     
     localStorage.setItem("token", "your-token"); // Replace with actual token logic
    handleClose();
   };

  return (
    <>
    <header>
    <Nav.Link as={Link} to="/"><h3>Göransbilar.se</h3></Nav.Link>
      <nav ref={navRef}>
      <Nav.Link as={Link} to="/" onClick={showNavbar}>Hem</Nav.Link>
             <Nav.Link as={Link} to="/forsale" onClick={showNavbar}>Till salu</Nav.Link>
             <Nav.Link as={Link} to="/contact" onClick={showNavbar}>Kontakt</Nav.Link>
            {token && (
              <Nav.Link as={Link} to="/newpost" onClick={showNavbar}>Ny annons</Nav.Link>
            )}
            
{token ? (
                <Nav.Link className="nav-link log" onClick={handleLogout}>
                  <FaSignOutAlt /> Logga ut
                 </Nav.Link>
              ) : (
                <Nav.Link className="nav-link log" onClick={handleShow}>
                  <FaUser /> Logga in
                </Nav.Link>
             )}

             <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes/>
             </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>

<Modal show={show} onHide={handleClose} centered>
         <Modal.Header closeButton>
          <Modal.Title>Logga in</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
             <Form.Group controlId="formBasicEmail">
               <Form.Label>Användarnamn</Form.Label>
               <Form.Control type="text" />
            </Form.Group>

             <Form.Group controlId="formBasicPassword" className="mt-3">
               <Form.Label>Lösenord</Form.Label>
               <Form.Control type="password" />
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Stäng
          </Button>
           <Button variant="primary" onClick={handleLogin}>
             Logga in
          </Button>
         </Modal.Footer>
       </Modal>
</>

);
}

export default HomeNavbar;
