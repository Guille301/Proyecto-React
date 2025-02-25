import Main from "./Main/Main";
import Header from "./Header/Header";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { onLogin, onLogout,onLoadToDos,onLoadCategories,onLoadFechas,onLoadMinutosFechas} from "../../app/slices/userSlice";
import { ObtenerRegistro } from "../../services/api";
 

const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const checkUser = JSON.parse(localStorage.getItem("userData"));
  const dispatcher = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (checkUser) {
        dispatcher(onLogin(checkUser));
        const id = checkUser.id;
        const apiKey = checkUser.apiKey;
        const response = await ObtenerRegistro(apiKey,id);

        console.log("Respuesta de la API", response);

        
        const registros = response.registros || []; 

       

       





        


        //Grafica Semana
         // generar fechasd de los ultimos 7 diass
    
 
         // Agrego las fechas y los minutos al store
       

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
