import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BrotherNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="przeszkody">Zgłoś przeszkody</Nav.Link>
                <Nav.Link as={Link} to="dashboard">Dashboard</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)