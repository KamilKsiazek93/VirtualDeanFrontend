import React from "react";
import { Navbar, Container ,Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";

export const CantorNavbar = () => {

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
                        <Nav.Link as={Link} to="schola">Wyznacz scholę</Nav.Link>
                        <Nav.Link as={Link} to="zmiana-hasla">Zmień hasło</Nav.Link>
                        <Button onClick={handleLogout}>Wyloguj</Button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}