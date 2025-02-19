import { useRef, useState, useEffect } from "react";
import "./RegisterPage.css";
import { getPaises, registrarse } from "../../services/api";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {onLogin} from "../../app/slices/userSlice";

const RegisterPage = () => {
    const inputUserNameRef = useRef();
    const inputPassRef = useRef();
    const inputPaisRef = useRef();
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [mensajeError, setMensajeError] = useState(null);
    const [paisesOption, setPaisesOption] = useState(null);
    const navigateTo = useNavigate();

    const userData = useSelector((state) => state.userSlice.userData);
  const dispatcher = useDispatch();

    /* useEffect(() => {
        if (localStorage.getItem("userId")) {
          navigateTo("/dashboard")
        }
      }, [userData]) *///autologin -> lleva al dashboard

    useEffect(() => {
        async function fetchData() {
            try {
                const paises = await getPaises();
                setPaisesOption(paises.paises);
            } catch (error) {
                alert("error fetch países")
            }
        }
        fetchData();
    }, []); //fetch países cuando se carga el comp. NO BORRAR PARÉNTESIS RECTOS

    const _onHandleClick = async (event) => {
        event.preventDefault();//evitar envío formulario
        try {
            const response = await registrarse(
                inputUserNameRef.current.value,
                inputPassRef.current.value,
                inputPaisRef.current.value
            );
            dispatcher(onLogin(response)); // Login automático post registro   
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
        <div className="register-container">
            <h1 className="text-center">Register</h1>
            <p className="text-center">
                Registrarse en la app.
            </p>
            <form>
                {/** Alert here */}
                <div className="form-group">
                    <label htmlFor="usuario">Nombre de usuario</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="usuario"
                            placeholder="fulanito123"
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
                <div className="form-group">
                    <label htmlFor="pais">País</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                        <select name="pais" id="pais" ref={inputPaisRef}>
                            {paisesOption ? paisesOption.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            )) : <option>Cargando países...</option>}
                        </select>
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
                    Registrarse
                </button>
                {mensajeError ? <p className="alert alert-warning">{mensajeError}</p> : <p />}
            </form>
        </div>
    );
};

export default RegisterPage;