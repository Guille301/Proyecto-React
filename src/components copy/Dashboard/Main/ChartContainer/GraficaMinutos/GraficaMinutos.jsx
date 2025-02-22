import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";

const Pastel = () => {
   // Asegúrate de que categories y toDos sean arrays
   const categories = useSelector((state) => state.userSlice.categories);
  const toDos = useSelector((state) => state.userSlice.toDos);

  console.log("Categories",categories);

  console.log("toDos",toDos);

   // Extraer tiempo para los valores (series)
   const series = toDos.map((item) => item.tiempo);
  // Extraer idActividad para las etiquetas (labels)
  const labels = categories.map((item) => `Actividad ${item.idActividad}`);

 


  console.log("Datos de labels",labels);

  console.log("Datos de series",series);


  const state = {
    series: series, // IMPORTANTE!!
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labels, // IMPORTANTE!!
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
      <div>
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
