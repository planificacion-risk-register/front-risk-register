import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Login} from '../components/login/Login'
import App from '../App';

export default function RoutesPlan() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/app' element={<App></App>}></Route>
        </Routes>
    </Router>
  )
}
