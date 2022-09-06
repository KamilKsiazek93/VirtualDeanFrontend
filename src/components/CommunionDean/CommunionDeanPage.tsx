import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChangePassword } from "../ChangePassword";
import { AddCommunion } from "./AddCommunion";
import { CommunionNavbar } from "./CommunionNavbar";

export const CommunionDeanPage = () => (
    <div>
        <CommunionNavbar />
        <Routes>
            <Route path="oficja" element={<AddCommunion />} />
            <Route path="zmiana-hasla" element={<ChangePassword />} />
        </Routes>
    </div>
)