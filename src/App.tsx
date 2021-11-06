import React from 'react';
import { webAPIUrl } from './AppSettings';

const brotherUrl = webAPIUrl + `/brothers`;

const fetchingData = () => {
  fetch(`${webAPIUrl}/brothers`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}

function App() {
  fetchingData()
  return (
    <div className="App">
      <header>
        <h1>Welcome bro!</h1>
      </header>
    </div>
  );
}

export default App;
