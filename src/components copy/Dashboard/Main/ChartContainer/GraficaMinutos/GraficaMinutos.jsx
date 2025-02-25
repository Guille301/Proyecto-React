import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ObtenerActividades} from "../../../../../services/api";


const Pastel = () => {
   // Asegúrate de que categories y toDos sean arrays
   const categories = useSelector((state) => state.userSlice.categories);
  const toDos = useSelector((state) => state.userSlice.toDos);
  const registros = useSelector((state) => state.userSlice.ejercicios);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const apiKey = userData.apiKey;
  const idUser = userData.id;

  const [actividades, setActividades] = useState([]);


  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await ObtenerActividades(apiKey, idUser);
        setActividades(response.actividades);
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    if (apiKey && idUser) {
      fetchActividades();
    }
  },[apiKey, idUser]);



  const getTitulo = (idActividad) => {
    const actividad = actividades.find((actividad) => actividad.id === idActividad);
    return actividad ? actividad.nombre : "Actividad no encontrada";
  };



  const sesionesPorActividad = {};
  registros.forEach((item) => {
    if (!sesionesPorActividad[item.idActividad]) {
      sesionesPorActividad[item.idActividad] = 0;
    }
    sesionesPorActividad[item.idActividad] += 1; // Contar sesiones
  });

  const seriesData = Object.values(sesionesPorActividad); // Cantidad de sesiones por actividad



  //Registor de actividades
  // Registor de actividades (sin duplicados)
  const uniqueActivities = new Set(registros.map((item) => item.idActividad)); 
  const labelsData = Array.from(uniqueActivities).map((idActividad) => getTitulo(idActividad)); 



//{1,45} -> map -> [getTitulo({s.idActividad)},45] 


  





  const state = {
    series: seriesData, 
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labelsData, // IMPORTANTE!!
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 360,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

    

    return (
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <div id="chart">
            <ReactApexChart 
            options={state.options} 
            series={state.series} type="pie" width={380} />
          </div>
        <div id="html-dist"></div>
      </div>
    );
  }

  export default Pastel;
