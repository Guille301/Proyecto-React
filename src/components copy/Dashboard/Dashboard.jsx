import Main from "./Main/Main";
import Header from "./Header/Header";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { onLogout,onLoadToDos,onLoadCategories,onLoadFechas,onLoadMinutosFechas} from "../../app/slices/userSlice";
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

        //Grafica Minutos
        const seriesData = registros.map((item) => item.tiempo); 
        dispatcher(onLoadToDos(seriesData));
        const labelsData = registros.map((item) => `Actividad ${item.idActividad}`); 
        dispatcher(onLoadCategories(labelsData));


        //Grafica Semana
         // 1. Generar las fechas de los últimos 7 días (incluyendo hoy)
         const fechas = [];
         for (let i = 6; i >= 0; i--) {
           const fecha = new Date();
           fecha.setDate(fecha.getDate() - i);
           fechas.push(fecha.toISOString().split("T")[0]); // Formato YYYY-MM-DD
         }
 
         // 2. Filtrar los minutos correspondientes a esas fechas
         const minutosPorFecha = fechas.map((fecha) => {
           const registrosDelDia = registros.filter((item) => item.fecha === fecha);
           const totalMinutos = registrosDelDia.reduce((sum, item) => sum + item.tiempo, 0);
           return totalMinutos;
         });
 
         // 3. Despachar las acciones para cargar las fechas y los minutos
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
