import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChangePassword } from "../ChangePassword";
import { BrotherAddObstacle } from "./BrotherAddObstacle";
import { BrotherDashboard } from "./BrotherDashboard";
import { BrotherNavbar } from "./BrotherNavbar";

export const BrotherPage = () => (
    <div>
        <BrotherNavbar />
        <Routes>
            <Route path="dashboard" element={<BrotherDashboard />} />
            <Route path="przeszkody" element={<BrotherAddObstacle />} />
            <Route path="zmiana-hasla" element={<ChangePassword />} />
        </Routes>
    </div>
)