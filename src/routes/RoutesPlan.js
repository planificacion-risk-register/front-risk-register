import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Login} from '../components/login/Login'
import App from '../App';
import { AddRisk } from '../components/riskRegister/AddRegister';
import Matrix from '../components/Matrix/Matrix';
import { ListTask } from '../components/riskRegister/ListTask';
import { CreateUser } from '../components/login/CreateUser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function RoutesPlan() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/app' element={<App></App>}></Route>
            <Route path='/addRisk/:id' element={<AddRisk></AddRisk>}></Route>
            <Route path='/matrix/:id' element={<Matrix></Matrix>}></Route>
            <Route path='/list' element={<ListTask></ListTask>}></Route>
            <Route path='/createUser' element={<CreateUser></CreateUser>}></Route>
        </Routes>
        <ToastContainer/>
    </Router>
  )
}
