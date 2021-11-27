import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { DeanPage } from './components/DeanPage';
import { LiturgistPage } from './components/LiturgistPage';
import { CantorPage } from './components/CantorPage';
import { MainNavbar } from './components/MainNavbar';
import './styles/styles.scss';

// const fetchingData = () => {
//   fetch(`${webAPIUrl}/brothers`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//     })
// }

function App() {
  //fetchingData()
  return (
    <div>
      
      <BrowserRouter >
      <MainNavbar />
          <div>
            <Routes>
              <Route path="dziekan/*" element={<DeanPage />} />
              <Route path="liturgista" element={<LiturgistPage />} />
              <Route path="kantor/*" element={<CantorPage />} />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
