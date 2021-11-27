import React from "react";
import { Navbar, Container ,Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CantorNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="schola">Wyznacz scholę</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)