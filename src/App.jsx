import { useState } from 'react'
import Dashboard from "./components copy/Dashboard/Dashboard";
import LoginPage from "./components copy/LoginPage/LoginPage";
import './App.css'

function App() {
  const [userData, setUserData] = useState(null);

  const _onLogin = (loginData) => {
    setUserData(loginData);
  };
  return (
    <div className="App">
      {userData ? <Dashboard /> : <LoginPage onLogin={_onLogin} />}
    </div>
  );
}

export default App;