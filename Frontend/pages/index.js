import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OLDApp from './OLDApp';
import OLD_reportWebVitals from './OLD_reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Hello There</h1>
    {/*<OLDApp />*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: OLD_reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
OLD_reportWebVitals();
