import "./Navbar.css";
import React, { useState } from "react";
import { Nav, Navbar, Modal, Button, Form } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-nav">
        <Nav className="me-auto">
          <Navbar.Brand as={Link} to="/" className="title">
            Görans Bil & Gräv
          </Navbar.Brand>
          <ul>
            <li>
              <NavLink to="/">Hem</NavLink>
            </li>
            <li>
              <NavLink to="/about">Om</NavLink>
            </li>
            <li>
              <NavLink to="/newpost">Nytt Inlägg</NavLink>
            </li>

            {token ? (
              <li>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Logga ut
                </Button>
              </li>
            ) : (
              <li>
                <Button variant="primary" onClick={handleShow}>
                  Logga in
                </Button>
              </li>
            )}
          </ul>
        </Nav>
      </Navbar>

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
          <Button variant="primary" onClick={handleClose}>
            Logga in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeNavbar;
