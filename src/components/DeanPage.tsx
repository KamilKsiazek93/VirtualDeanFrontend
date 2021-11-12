import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AddBrotherForm } from "./AddBrotherForm";
import { DeanOffice } from "./DeanOffice";
import { KitchenOffice } from './KitchenOffice';

export const DeanPage = () => (
    <div>
        <h2>Panel dziekana</h2>
        <Link className="nav-link" to="oficja">Wyznacz oficja tygodniowe</Link>
        <Link className="nav-link" to="oficja-kuchenne">Wyznacz oficja kuchenne</Link>
        <Link className="nav-link" to="dodaj-brata">Dodaj brata</Link>
        <Routes>
            <Route path="oficja-kuchenne" element={<KitchenOffice />} />
            <Route path="oficja" element={<DeanOffice />} />
            <Route path="dodaj-brata" element={<AddBrotherForm />} />
        </Routes>
    </div>
)