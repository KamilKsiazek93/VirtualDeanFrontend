import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddTray } from "./AddTray";
import { LiturgistNavbar } from "./LiturgistNavbar";

export const LiturgistPage = () => (
    <div>
        <LiturgistNavbar />
        <Routes>
            <Route path="taca" element={<AddTray />} />
            <Route path="oficja" />
        </Routes>
    </div>
)