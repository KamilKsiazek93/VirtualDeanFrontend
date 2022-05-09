import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";

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
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="oficja">Wyznacz komunie</Nav.Link>
                        <Button onClick={handleLogout}>Wyloguj</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}