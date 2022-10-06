import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChangePassword } from "../ChangePassword";
import { FooterHerb } from "../FooterHerb";
import { AddTray } from "./AddTray";
import { LiturgistNavbar } from "./LiturgistNavbar";
import { LiturgistOffice } from "./LiturgistOffice";

export const LiturgistPage = () => (
    <div>
        <LiturgistNavbar />
        <Routes>
            <Route path="taca" element={<AddTray />} />
            <Route path="oficja" element={<LiturgistOffice />} />
            <Route path="zmiana-hasla" element={<ChangePassword />} />
        </Routes>
        <FooterHerb />
    </div>
)