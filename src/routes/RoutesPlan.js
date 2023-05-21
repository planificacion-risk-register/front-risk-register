import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Login} from '../components/login/Login'
import App from '../App';
import { AddRisk } from '../components/riskRegister/AddRegister';
import Matrix from '../components/Matrix/Matrix';

export default function RoutesPlan() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/app' element={<App></App>}></Route>
            <Route path='/addRisk' element={<AddRisk></AddRisk>}></Route>
            <Route path='/matrix' element={<Matrix></Matrix>}></Route>
        </Routes>
    </Router>
  )
}
