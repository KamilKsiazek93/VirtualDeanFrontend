import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { DeanPage } from './components/DeanPage';
import { LiturgistPage } from './components/LiturgistPage';
import { CantorPage } from './components/CantorPage';
import { BrotherPage } from './components/BrotherPage';
import { LoginPage } from './components/LoginPage';
import PrivateRoute from './routers/PrivateRoute';

function App() {

  return (
    <div>
      <BrowserRouter >
            <Routes>
              <Route path="dziekan/*" element={<DeanPage />} />
              <Route path="liturgista/*" element={<LiturgistPage />} />
              <Route path="kantor/*" element={<CantorPage />} />
              <Route path="brat/*" element={<PrivateRoute />} >
                <Route path="brat/*" element={<BrotherPage />} />
              </Route>
              <Route path="/" element={<LoginPage />} />
            </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App;
