import { useState, useEffect } from 'react'
import Dashboard from "./components copy/Dashboard/Dashboard";
import LoginPage from "./components copy/LoginPage/LoginPage";
import RegisterPage from './components copy/RegisterPage/RegisterPage';
import PrivateRoute from './components copy/PrivateRoute/PrivateRoute';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatcher = useDispatch();
  const navigateTo = useNavigate();

  /* useEffect(() => {
    const userId = localStorage.getItem("userId");
    const apiKey = localStorage.getItem("apiKey");
    if (userId && apiKey) {
      setUserData({ id: userId, apiKey: apiKey });
    }
  }, []); *///Auto login cuando se carga la app y comprueba si hay datos en el local storage
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigateTo("/dashboard")
    }
  }, [userData])//autologin -> lleva al dashboard

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={userData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element=
          {<PrivateRoute>
            <Dashboard/>
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;