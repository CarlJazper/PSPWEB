import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//Guest
import Home from './Components/Home';
import Coaches from './Components/Coaches';
import Services from './Components/Services';
import Memberships from './Components/Memberships';
import Map from './Components/Map';

//Auth
import Register from './Components/User/Auth/Register';
import Login from './Components/User/Auth/Login';

//User
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';

//Admin
import Dashboard from './Components/Admin/Dashboard';
//Admin/User
import UsersList from './Components/Admin/User/UsersList';
import UpdateUser from './Components/Admin/User/UpdateUser';
//Admin/Branch
import BranchList from './Components/Admin/Branch/BranchList';
import CreateBranch from './Components/Admin/Branch/CreateBranch';
import UpdateBranch from './Components/Admin/Branch/UpdateBranch';
//Admin/Exercise
import ExerciseList from './Components/Admin/Exercise/ExerciseList';
import CreateExercise from './Components/Admin/Exercise/CreateExercise';
import UpdateExercise from './Components/Admin/Exercise/UpdateExercise';
//Admin/Trainer
import TrainerList from './Components/Admin/Trainer/TrainerList';
import CreateTrainer from './Components/Admin/Trainer/CreateTrainer';
import UpdateTrainer from './Components/Admin/Trainer/UpdateTrainer';

//utils
//import ProtectedRoute from './utils/ProtectedRoute';
import ProtectedRoute from './utils/ProtectedRoute';

//layouts
import Header from './Components/Layout/Header'

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleBranchCreated = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  const handleExerciseCreated = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  const handleTrainerCreated = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Guest */}
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/services" element={<Services />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/map" element={<Map />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register exact="true" />} />

          {/* User */}
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true" />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />

          {/* Admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute isAdmin={true}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />

                  {/* User Routes */}
                  <Route path="users" element={<UsersList />} />
                  <Route path="user/:id" element={<UpdateUser />} />

                  {/* Branch Routes */}
                  <Route path="branches" element={<BranchList refresh={refresh} />} />
                  <Route path="create-branch" element={<CreateBranch onBranchCreated={handleBranchCreated} />} />
                  <Route path="update-branch/:id" element={<UpdateBranch />} />

                  {/* Exercise Routes */}
                  <Route path="exercises" element={<ExerciseList refresh={refresh} />} />
                  <Route path="create-exercises" element={<CreateExercise onExerciseCreated={handleExerciseCreated} />} />
                  <Route path="update-exercise/:id" element={<UpdateExercise />} />

                   {/* Exercise Routes */}
                  <Route path="trainers" element={<TrainerList refresh={refresh} />} />
                  <Route path="create-trainer" element={<CreateTrainer onTrainerCreated={handleTrainerCreated} />} />
                  <Route path="update-trainer/:id" element={<UpdateTrainer />} />

                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
