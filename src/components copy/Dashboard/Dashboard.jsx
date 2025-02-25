import Main from "./Main/Main";
import Header from "./Header/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onLogin, onLogout, onLoadToDos, onLoadCategories, onLoadFechas, onLoadMinutosFechas } from "../../app/slices/userSlice";
import { ObtenerRegistro, ObtenerActividades } from "../../services/api";


const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const checkUser = JSON.parse(localStorage.getItem("userData"));
  const dispatcher = useDispatch();
  const apiKey = checkUser.apiKey;
  const id = checkUser.id;

  useEffect(() => {
    async function fetchData() {
      if (checkUser) {
        dispatcher(onLogin(checkUser));
        const response = await ObtenerRegistro(apiKey, id);
        const registros = response.registros || [];
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await ObtenerActividades(apiKey, id);
        dispatcher(onLoadCategories(response.actividades));
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    if (apiKey && id) {
      fetchActividades();
    }
  }, [apiKey, id]);



  return (
    <div className="container-fluid">
      <Header />
      <Main />
    </div>
  );
};

export default Dashboard;
