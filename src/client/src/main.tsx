import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Helmet>
        </HelmetProvider>
        <App />
    </React.StrictMode>,
);
