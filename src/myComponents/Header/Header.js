import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar bg="transparent" expand="lg">
        <Link className="nav-link text-success" to="/home">Travel Hanger</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/destination">
                Destination
              </Link>
              <Link className="nav-link" to="/home">
                Blog
              </Link>
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
              <Link to="/login">
                <button className="btn btn-success">Login</button>
              </Link>            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
