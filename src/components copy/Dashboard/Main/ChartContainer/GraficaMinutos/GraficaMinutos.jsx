import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";

const Pastel = () => {
   // Asegúrate de que categories y toDos sean arrays
   const categories = useSelector((state) => state.userSlice.categories);
  const toDos = useSelector((state) => state.userSlice.toDos);



  const state = {
    series: toDos, // IMPORTANTE!!
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: categories, // IMPORTANTE!!
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
