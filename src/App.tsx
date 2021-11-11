import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { DeanPage } from './components/DeanPage';
import { LiturgistPage } from './components/LiturgistPage';
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
    <BrowserRouter >
        <div>
          <Routes>
            <Route path="dziekan/*" element={<DeanPage />} />
            <Route path="liturgista" element={<LiturgistPage />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App;
