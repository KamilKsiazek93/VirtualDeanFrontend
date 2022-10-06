import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

export const DeanNavbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storage = window.localStorage

    const handleLogout = () => {
        dispatch(logout)
        storage.removeItem('user')
        navigate('/')
    }

    return (
        <div>
            <Navbar className="header-nav" expand="lg">
                <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="oficja">Wyznacz oficja tygodniowe</Nav.Link>
                        <Nav.Link as={Link} to="oficja-kuchenne">Wyznacz oficja kuchenne</Nav.Link>
                        <Nav.Link as={Link} to="oficja-wydruk">Pokaż oficja tygodniowe</Nav.Link>
                        <Nav.Link as={Link} to="dodaj-brata">Dodaj brata</Nav.Link>
                        <Nav.Link as={Link} to="edytuj-braci">Edytuj braci</Nav.Link>
                        <Nav.Link as={Link} to="przeszkody-stale">Przedzkody stałe</Nav.Link>
                        <Nav.Link as={Link} to="przeszkody-miedzy-oficjami">Przeszkody między oficjami</Nav.Link>
                        <Nav.Link as={Link} to="zmiana-hasla">Zmień hasło</Nav.Link>
                        <Button onClick={handleLogout}>Wyloguj</Button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}