import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import RoutesPlan from './routes/RoutesPlan';
import { AxiosInterceptor } from './interceptors/axios.interceptor';

AxiosInterceptor();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesPlan />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
