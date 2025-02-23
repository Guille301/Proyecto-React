import Main from "./Main/Main";
import Header from "./Header/Header";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { onLogout,onLoadToDos,onLoadCategories } from "../../app/slices/userSlice";
import { ObtenerRegistro } from "../../services/api";
 

const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatcher = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (userData) {
        const { id,apiKey } = userData;
        const response = await ObtenerRegistro(apiKey,id);

        console.log("Respuesta de la API", response);

        
        const registros = response.registros || []; 

        
        const seriesData = registros.map((item) => item.tiempo); 
        dispatcher(onLoadToDos(seriesData));

        
        const labelsData = registros.map((item) => `Actividad ${item.idActividad}`); 
        dispatcher(onLoadCategories(labelsData));

      }
    }
    fetchData();
  }, []);




  return (
    <div className="container-fluid">
      <Header/>
      <Main/>
    </div>
  );
};

export default Dashboard;
