import React from "react";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ cartCount = 0, user, onLogout, theme, toggleTheme }) {
  const navigate = useNavigate();

  return (
    <Navbar bg={theme === "dark" ? "dark" : "white"} variant={theme} expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
          🛍️ ShopEase
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              end
              className={({ isActive }) => (isActive ? "fw-bold text-primary" : "")}
            >
              Home
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/products"
              className={({ isActive }) => (isActive ? "fw-bold text-primary" : "")}
            >
              Products
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/cart"
              className={({ isActive }) => `d-flex align-items-center ${isActive ? "fw-bold text-primary" : ""}`}
            >
              Cart
              {cartCount > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <div className="d-flex align-items-center gap-3 ms-lg-2">
                <span className="fw-semibold text-secondary">Hi, {user.name}</span>
                <Button variant="outline-danger" size="sm" onClick={() => { onLogout(); navigate("/"); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <Nav.Link 
                as={NavLink} 
                to="/login"
                className={({ isActive }) => (isActive ? "fw-bold text-primary" : "")}
              >
                Login
              </Nav.Link>
            )}

            <Button
              variant={theme === "dark" ? "outline-light" : "outline-dark"}
              size="sm"
              onClick={toggleTheme}
              className="ms-lg-2"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;