import React from "react";
import { Route, Routes } from "react-router-dom";
import { CantorNavbar } from "./CantorNavbar";
import { Schola } from "./Schola";
export const CantorPage = () => (
    <div>
        <CantorNavbar />
        <Routes>
            <Route path="schola" element={<Schola />} />
        </Routes>
    </div>
)