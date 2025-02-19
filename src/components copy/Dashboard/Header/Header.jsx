import "./Header.css";
import logo from "../../../img/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../../app/slices/userSlice";

const Header = () => {

  const userData = useSelector((state) => state.userSlice.userData);
  const dispatcher = useDispatch();

  return (
    <header className="row">
      <div id="header" className="col-12 d-flex justify-content-between align-items-center my-3 ">
        <div className="d-flex align-items-center">
          <figure className="m-2">
          <img src={logo} alt="Logo" className="mr-2 rounded-circle" width={70} />
          </figure>
          <h1>Gestión de ejercicios</h1>
        </div>
        <div>
          <button type="submit" 
          className={`btn btn-light btn-block`} 
          onClick={() => dispatcher(onLogout())}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
