import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeanPage } from "../components/DeanPage";
import { LiturgistPage } from "../components/LiturgistPage";
import { CantorPage } from "../components/CantorPage";
import { BrotherPage } from "../components/BrotherPage";
import { LoginPage } from "../components/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
    return (
        <div>
          <BrowserRouter >
                <Routes>
                  <Route path="dziekan/*" element={<DeanPage />} />
                  <Route path="liturgista/*" element={<LiturgistPage />} />
                  <Route path="kantor/*" element={<CantorPage />} />
                  <Route path="brat/*" element={<BrotherPage />} />
                  <Route path="/" element={<LoginPage />} />
                </Routes>
          </BrowserRouter>
        
        </div>
      )
}