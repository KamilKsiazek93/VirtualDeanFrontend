import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DeanNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="oficja">Wyznacz oficja tygodniowe</Nav.Link>
                <Nav.Link as={Link} to="oficja-kuchenne">Wyznacz oficja kuchenne</Nav.Link>
                <Nav.Link as={Link} to="dodaj-brata">Dodaj brata</Nav.Link>
                <Nav.Link as={Link} to="edytuj-braci">Edytuj braci</Nav.Link>
                <Nav.Link as={Link} to="przeszkody-stale">Przedzkody stałe</Nav.Link>
                <Nav.Link as={Link} to="przeszkody-miedzy-oficjami">Przeszkody między oficjami</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)