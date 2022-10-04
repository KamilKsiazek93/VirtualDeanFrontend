import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";

export const CommunionNavbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                            <Nav.Link as={Link} to="oficja">Wyznacz komunie</Nav.Link>
                            <Nav.Link as={Link} to="zmiana-hasla">Zmień hasło</Nav.Link>
                            <Button onClick={handleLogout}>Wyloguj</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="header-margin">
                <div className="body-background" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/Herb1.png'})`}}></div>
            </div>
        </div>
    )
}