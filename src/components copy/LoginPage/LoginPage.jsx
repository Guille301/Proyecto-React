import { useRef, useState, useEffect } from "react";
import "./LoginPage.css";
import { login } from "../../services/api";
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../../img/logo.jpg"
import { useNavigate, Link } from "react-router-dom";


const LoginPage = ({ onLogin, userData }) => {
  const inputUserNameRef = useRef();
  const inputPassRef = useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [mensajeError, setMensajeError] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (userData) {
      navigateTo("/dashboard")
    }
  }, [userData])
  

  const _onHandleClick = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe
    try {
      const response = await login(
        inputUserNameRef.current.value,
        inputPassRef.current.value
      );
      setMensajeError(null);
      onLogin(response); // Llama a la función onLogin con la respuesta
    } catch (error) {
      setMensajeError(error);
    }
  };
  

  const _onHandleChange = () => {
    if (
      inputUserNameRef.current.value.length > 0 &&
      inputPassRef.current.value.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  return (
    <div className="login-container">
      <div className="text-center logo-container">
        <figure className="img-fluid">
        <img src={logo} width="90" alt="Logo" />
        </figure>
      </div>
      <h1 className="text-center">Login</h1>
      <p className="text-center">
        Ingresá con tu mail y contraseña.
      </p>
      <form>
        {/** Alert here */}
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email@address.com"
              ref={inputUserNameRef}
              onChange={_onHandleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              ref={inputPassRef}
              onChange={_onHandleChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-eye"></i>
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-primary btn-block`}
          onClick={_onHandleClick}
          disabled={btnDisabled}
        >
          Login
        </button>
        {mensajeError ? <p className="alert alert-warning">{mensajeError}</p> : <p/>}
      </form>
      <p className="text-center mt-4">
        ¿No tenés cuenta? <Link to="/register">¡Registrate!</Link>
      </p>
    </div>
  );
};

export default LoginPage;