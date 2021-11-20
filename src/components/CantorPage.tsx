import React from "react";
import { Route, Routes } from "react-router-dom";
import { CantorNavbar } from "./CantorNavbar";
import { Schola } from "./Schola";
import { SingingEdit } from "./SingingEdit";

export const CantorPage = () => (
    <div>
        <CantorNavbar />
        <Routes>
            <Route path="schola" element={<Schola />} />
            <Route path="spiewajacy-edycja" element={<SingingEdit />} />
        </Routes>
    </div>
)