import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import TenantApp from './TenantApp.tsx';
import PublicApp from './PublicApp.tsx';

const hostname = window.location.hostname;
const root = ReactDOM.createRoot(document.getElementById('root')!);

const isTenant = hostname.includes("localhost") && hostname !== "localhost";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {isTenant ? <TenantApp /> : <PublicApp />}
    </BrowserRouter>
  </React.StrictMode>
);