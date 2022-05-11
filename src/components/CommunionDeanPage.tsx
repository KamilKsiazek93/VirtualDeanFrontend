import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddCommunion } from "./AddCommunin";
import { CommunionNavbar } from "./CommunionNavbar";

export const CommunionDeanPage = () => (
    <div>
        <CommunionNavbar />
        <Routes>
            <Route path="oficja" element={<AddCommunion />} />
        </Routes>
    </div>
)