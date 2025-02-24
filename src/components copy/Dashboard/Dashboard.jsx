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
         const fechas = [];
         for (let i = 6; i >= 0; i--) {
           const fecha = new Date();
           fecha.setDate(fecha.getDate() - i);
           fechas.push(fecha.toISOString().split("T")[0]); // Formato YYYY-MM-DD
         }
 
         // Filtrar los minutos correspondientes
         const minutosPorFecha = fechas.map((fecha) => {
           const registrosDelDia = registros.filter((item) => item.fecha === fecha);
           const totalMinutos = registrosDelDia.reduce((sum, item) => sum + item.tiempo, 0);
           return totalMinutos;
         });
 
         // Agrego las fechas y los minutos al store
         dispatcher(onLoadFechas(fechas));
         dispatcher(onLoadMinutosFechas(minutosPorFecha));

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
