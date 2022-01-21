import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrotherDashboard } from "./BrotherDashboard";

export const BrotherPage = () => (
    <div>
        <Routes>
            <Route path="dashboard" element={<BrotherDashboard />} />
        </Routes>
    </div>
)