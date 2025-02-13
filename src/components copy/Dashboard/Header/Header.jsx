import "./Header.css";
import logo from "./logo.jpg";
const Header = ({ onLogout }) => {

  const _onHandleClick =  () => {
    onLogout();
  };

  return (
    <header className="row">
      <div className="col-12 d-flex justify-content-between align-items-center my-3 ">
        <div className="d-flex align-items-center">
          <figure className="m-2">
          <img src={logo} alt="Logo" className="mr-2 rounded" width={70} />
          </figure>
          <h1>Gestión de ejercicios</h1>
        </div>
        <div>
          <button type="submit" 
          className={`btn btn-light btn-block`} 
          onClick={_onHandleClick}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
