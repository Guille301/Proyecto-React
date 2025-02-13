import { useRef, useState, useEffect } from "react";
import "./RegisterPage.css";
import { getPaises, registrarse } from "../../services/api";
import 'bootstrap/dist/css/bootstrap.css';

const RegisterPage = ({ onRegister }) => {
    const inputUserNameRef = useRef();
    const inputPassRef = useRef();
    const inputPaisRef = useRef();
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [mensajeError, setMensajeError] = useState(null);
    const [paisesOption, setPaisesOption] = useState(null);
    let paisesHTML = "";

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
    }, []); //fetch países cuando se carga el comp.

    const _onHandleClick = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe
        try {
            const response = await login(
                inputUserNameRef.current.value,
                inputPassRef.current.value
            );

            if (response && response.id) {
                localStorage.setItem("userId", response.id); // Guarda el ID del usuario
                localStorage.setItem("apiKey", response.apiKey);
            }
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
        <div className="register-container">
            <h1 className="text-center">Register</h1>
            <p className="text-center">
                Registrarse en la app.
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