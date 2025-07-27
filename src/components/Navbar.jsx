import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export default function AppNavbar() {
  const cartItems = useSelector(state => state.cart.items);
  const orderCount = useSelector(state => state.orders?.length || 0);
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="OpenCart logo"
            />
            OpenCart
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart <Badge bg="danger" pill>{cartItems.length}</Badge>
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/orders">
              <Nav.Link>
                Orders <Badge bg="info" pill>{orderCount}</Badge>
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <LinkContainer to="/profile">
              <Nav.Link>
                <i className="bi bi-person-fill"></i> Account
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}