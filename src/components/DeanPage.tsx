import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { AddBrotherForm } from "./AddBrotherForm";
import { DeanOffice } from "./DeanOffice";
import { EditBrothers } from "./EditBrother";
import { KitchenOffice } from './KitchenOffice';
import { ObstacleBetweenOffices } from "./ObstacleBetweenOffices";
import { ObstacleConst } from "./ObstacleConst";

export const DeanPage = () => (
    <div>
        <h2>Panel dziekana</h2>
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

        <Routes>
            <Route path="oficja-kuchenne" element={<KitchenOffice />} />
            <Route path="oficja" element={<DeanOffice />} />
            <Route path="dodaj-brata" element={<AddBrotherForm />} />
            <Route path="edytuj-braci" element={<EditBrothers />} />
            <Route path="przeszkody-stale" element={<ObstacleConst />} />
            <Route path="przeszkody-miedzy-oficjami" element={<ObstacleBetweenOffices />} />
        </Routes>
    </div>
)