import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Navbar, 
  Nav, 
  Container, 
  Button, 
  Form, 
  FormControl,
  Badge,
  Dropdown
} from 'react-bootstrap';
import { 
  FaShoppingCart, 
  FaSearch, 
  FaUser, 
  FaHeart,
  FaBars 
} from 'react-icons/fa';

const AppNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <i className="bi bi-shop me-2"></i>
          OpenCart
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Main Navigation */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold">
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="fw-semibold">
              <i className="bi bi-grid me-1"></i>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold">
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: '200px' }}
            />
            <Button variant="outline-light" type="submit">
              <FaSearch />
            </Button>
          </Form>

          {/* User Actions */}
          <Nav className="align-items-center">
            {/* Wishlist */}
            <Nav.Link as={Link} to="/wishlist" className="position-relative me-2">
              <FaHeart size={18} />
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{fontSize: '0.6rem'}}>
                0
              </Badge>
            </Nav.Link>

            {/* Shopping Cart */}
            <Nav.Link as={Link} to="/cart" className="position-relative me-3">
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{fontSize: '0.6rem'}}>
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* User Account Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                <FaUser className="me-1" />
                Account
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/orders">
                  <i className="bi bi-bag me-2"></i>
                  Order History
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/wishlist">
                  <i className="bi bi-heart me-2"></i>
                  Wishlist
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#login">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Dropdown.Item>
                <Dropdown.Item href="#register">
                  <i className="bi bi-person-plus me-2"></i>
                  Register
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
