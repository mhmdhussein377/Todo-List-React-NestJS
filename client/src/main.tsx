import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import axios from "axios"
import {AuthProvider} from './Context/AuthContext.tsx'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <AuthProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AuthProvider>
</React.StrictMode>,)
