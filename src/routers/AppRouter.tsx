import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeanPage } from "../components/DeanPage";
import { LiturgistPage } from "../components/LiturgistPage";
import { CantorPage } from "../components/CantorPage";
import { BrotherPage } from "../components/BrotherPage";
import { LoginPage } from "../components/LoginPage";
import { BrotherRoute } from "./BrotherRoute";
import { CantorRoute } from "./CantorRoute";
import { DeanRoute } from "./DeanRoute";
import { LiturgistRoute } from "./LiturgistRoute";

export const AppRouter = () => {
    return (
        <div>
          <BrowserRouter >
                <Routes>
                  <Route path="dziekan/*" element={<DeanRoute><DeanPage /></DeanRoute>} />
                  <Route path="liturgista/*" element={<LiturgistRoute><LiturgistPage /></LiturgistRoute>} />
                  <Route path="kantor/*" element={<CantorRoute><CantorPage /></CantorRoute>} />
                  <Route path="brat/*" element={<BrotherRoute><BrotherPage /></BrotherRoute>} />
                  <Route path="/" element={<LoginPage />} />
                </Routes>
          </BrowserRouter>
        
        </div>
      )
}