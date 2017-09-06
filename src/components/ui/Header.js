import React from 'react';
import { Navbar, Nav, NavItem,
  MenuItem, NavDropdown } from 'react-bootstrap';

let home;

if (process.env === 'production') {
  home = 'https://www.projectmam.com/';
} else {
  home = 'http://localhost:8000/';
}

const Header = () => (
  <Navbar fixedTop fluid inverse collapseOnSelect id="project-mam-navbar">
    <Navbar.Header>
      <Navbar.Brand>
        <a href={home}>ProjectMaM</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#" active>Projects</NavItem>
        <NavItem eventKey={2} href="#">Blog</NavItem>
        <NavItem eventKey={3} href="#">About</NavItem>
        <NavItem eventKey={4} href="#">Contact</NavItem>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={5} title=" " id="login-dropdown" noCaret>
          <MenuItem eventKey={5.1}>Login</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
