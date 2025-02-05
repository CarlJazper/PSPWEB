import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from './Components/Layout/Header'
import Home from './Components/Home';

//Guest
import Coaches from './Components/Coaches';
import Services from './Components/Services';
import Memberships from './Components/Memberships';
import Map from './Components/Map';

//Auth
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';

//User
import UsersList from './Components/Admin/User/UsersList';
import UpdateUser from './Components/Admin/User/UpdateUser';

import ProtectedRoute from './Components/Route/ProtectedRoute';
import Dashboard from './Components/Admin/Dashboard';

import axios from 'axios';

function App() {
  
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register exact="true" />} />
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update"element={<UpdateProfile />}exact="true"/>
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          
          <Route path="/coaches" element={<Coaches/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/memberships" element={<Memberships/>}/>
          <Route path="/map" element={<Map/>}/>

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
