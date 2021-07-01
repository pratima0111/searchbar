import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Autocomplete from './Components/Autocomplete';
import data from './Components/data.json';

ReactDOM.render(
  <React.StrictMode>
    <Autocomplete suggestions={data} />
  </React.StrictMode>,
  document.getElementById('root')
);

