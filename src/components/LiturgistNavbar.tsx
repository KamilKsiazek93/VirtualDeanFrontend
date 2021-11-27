import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LiturgistNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="taca">Wyznacz tacę</Nav.Link>
                <Nav.Link as={Link} to="oficja">Wyznacz oficja liturgiczne</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)