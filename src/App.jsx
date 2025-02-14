import { useState } from 'react'
import Dashboard from "./components copy/Dashboard/Dashboard";
import LoginPage from "./components copy/LoginPage/LoginPage";
import RegisterPage from './components copy/RegisterPage/RegisterPage';
import './App.css'

function App() {
  const [userData, setUserData] = useState(null);

  const _onLogin = (loginData) => {
    setUserData(loginData);
  };

  const _onLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("apiKey");
    setUserData(null); // Reiniciar el estado del usuario
  };


  return (
    <div className="App">
      {/* <RegisterPage/> */}
      {userData ? <Dashboard onLogout={_onLogout}  /> : <LoginPage onLogin={_onLogin} />}
    </div>
  );
}

export default App;