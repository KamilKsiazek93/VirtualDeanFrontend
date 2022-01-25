import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { DeanPage } from './components/DeanPage';
import { LiturgistPage } from './components/LiturgistPage';
import { CantorPage } from './components/CantorPage';
import { BrotherPage } from './components/BrotherPage';
import { LoginPage } from './components/LoginPage';

function App() {

  return (
    <div>
      <BrowserRouter >
            <Routes>
              <Route path="dziekan/*" element={<DeanPage />} />
              <Route path="liturgista/*" element={<LiturgistPage />} />
              <Route path="/" element={<LoginPage />} />
            </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App;
