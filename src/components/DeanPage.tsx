import React from "react";
import { Routes, Route } from "react-router";
import { DeanOffice } from "./DeanOffice";
import { KitchenOffice } from './KitchenOffice';

export const DeanPage = () => (
    <div>
        <p>DeanPage</p>
        <Routes>
            <Route path="oficja-kuchenne" element={<KitchenOffice />} />
            <Route path="oficja" element={<DeanOffice />} />
        </Routes>
    </div>
)