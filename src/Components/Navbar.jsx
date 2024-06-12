import "./Navbar.css";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <Navbar expand="lg" className="navbar-nav">
      <Nav className="me-auto">
        <Link to="/" className="title">
          Görans Bil & Gräv
        </Link>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </Nav>
    </Navbar>
  );
}

export default HomeNavbar;
