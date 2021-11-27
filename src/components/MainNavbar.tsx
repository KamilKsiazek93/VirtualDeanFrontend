import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MainNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="kantor">Strefa kantora</Nav.Link>
                <Nav.Link as={Link} to="dziekan">Strefa dziekana</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)