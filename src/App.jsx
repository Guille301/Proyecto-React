import { useState, useEffect } from 'react'
import Dashboard from "./components copy/Dashboard/Dashboard";
import LoginPage from "./components copy/LoginPage/LoginPage";
import RegisterPage from './components copy/RegisterPage/RegisterPage';
import PrivateRoute from './components copy/PrivateRoute/PrivateRoute';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const apiKey = localStorage.getItem("apiKey");
    if (userId && apiKey) {
      setUserData({ id: userId, apiKey: apiKey });
    }
  }, []);//Auto login cuando se carga la app y comprueba si hay datos en el local storage

  useEffect(() => {
    console.log("Current userData:", userData);
  }, [userData]);

  const _onLogin = (loginData) => {
    console.log("loginData:", loginData); // Verifica esto

    localStorage.setItem("userId", loginData.id); // Guarda el ID del usuario
    localStorage.setItem("apiKey", loginData.apiKey);
    console.log("Datos guardados en localStorage"); // Verifica esto

    setUserData(loginData);
    alert("Usuario logueado correctamente");
  };

  const _onLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("apiKey");
    setUserData(null); // Reiniciar el estado del usuario
  };

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={userData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage onLogin={_onLogin} userData={userData} />} />
        <Route path="/register" element={<RegisterPage onLogin={_onLogin} userData={userData} />} />
        <Route path="/dashboard" element=
          {<PrivateRoute userData={userData}>
            <Dashboard userData={userData} onLogout={_onLogout} />
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;