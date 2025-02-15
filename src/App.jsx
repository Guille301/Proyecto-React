import { useState } from 'react'
import Dashboard from "./components copy/Dashboard/Dashboard";
import LoginPage from "./components copy/LoginPage/LoginPage";
import RegisterPage from './components copy/RegisterPage/RegisterPage';
import PrivateRoute from './components copy/PrivateRoute/PrivateRoute';
import './App.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState(null);

  const _onLogin = (loginData) => {
    setUserData(loginData);
    alert("serUserData");
  };

  const _onLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("apiKey");
    setUserData(null); // Reiniciar el estado del usuario
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={_onLogin} userData={userData} />}/>
        <Route path="/register" element={<RegisterPage onLogin={_onLogin} userData={userData}/>} />
        <Route path="/dashboard" element=
          {<PrivateRoute userData={userData}>
            <Dashboard userData={userData} onLogout={_onLogout} />
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;