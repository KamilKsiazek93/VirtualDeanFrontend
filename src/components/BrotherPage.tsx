import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrotherAddObstacle } from "./BrotherAddObstacle";
import { BrotherDashboard } from "./BrotherDashboard";
import { BrotherNavbar } from "./BrotherNavbar";

export const BrotherPage = () => (
    <div>
        <BrotherNavbar />
        <Routes>
            <Route path="dashboard" element={<BrotherDashboard />} />
            <Route path="przeszkody" element={<BrotherAddObstacle />} />
        </Routes>
    </div>
)