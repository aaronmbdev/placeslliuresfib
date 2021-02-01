import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import Footer from './Footer'
import Heading from "./Heading";
import LangSwitch from "./LangSwitch"
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
ReactDOM.render(
    <React.StrictMode>
        <Footer />
    </React.StrictMode>,
    document.getElementById('footer')
)
ReactDOM.render(
    <React.StrictMode>
        <Heading />
    </React.StrictMode>,
    document.getElementById('heading')
)
ReactDOM.render(
    <React.StrictMode>
        <LangSwitch />
    </React.StrictMode>,
    document.getElementById('langswitch')
)
reportWebVitals();
