import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddBrotherForm } from "./AddBrotherForm";
import { DeanNavbar } from "./DeanNavbar";
import { DeanOffice } from "./DeanOffice";
import { DeanPrintedOffices } from "./DeanPrintedOffices";
import { EditBrothers } from "./EditBrother";
import { KitchenOffice } from './KitchenOffice';
import { ObstacleBetweenOffices } from "./ObstacleBetweenOffices";
import { ObstacleConst } from "./ObstacleConst";

export const DeanPage = () => (
    <div>
        <DeanNavbar />

        <Routes>
            <Route path="oficja-kuchenne" element={<KitchenOffice />} />
            <Route path="oficja" element={<DeanOffice />} />
            <Route path="oficja-wydruk" element={<DeanPrintedOffices />} />
            <Route path="dodaj-brata" element={<AddBrotherForm />} />
            <Route path="edytuj-braci" element={<EditBrothers />} />
            <Route path="przeszkody-stale" element={<ObstacleConst />} />
            <Route path="przeszkody-miedzy-oficjami" element={<ObstacleBetweenOffices />} />
        </Routes>
    </div>
)