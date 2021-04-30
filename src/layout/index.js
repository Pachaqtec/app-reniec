import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './style.css'

const Layout = ({
  children
}) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        {/* <Navbar.Brand href="#home">Reniec</Navbar.Brand> */}
        <Link to="/home">
          <img
            style={{ height: '70px', cursor: 'pointer' }}
            src="https://erep.reniec.gob.pe/pier/javax.faces.resource/logo_reniec_rgb.png.jsf?ln=img"
            alt="logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">
              <Link to="/home">Home</Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link to="/registrar">Registrar</Link>
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div className="l_layout">
        {children}
      </div>
    </div>
  )
}

export default Layout
