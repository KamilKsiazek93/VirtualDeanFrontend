import React from "react";
import { Route, Routes } from "react-router-dom";
import { LiturgistNavbar } from "./LiturgistNavbar";

export const LiturgistPage = () => (
    <div>
        <LiturgistNavbar />
        <Routes>
            <Route path="taca" />
            <Route path="oficja" />
        </Routes>
    </div>
)