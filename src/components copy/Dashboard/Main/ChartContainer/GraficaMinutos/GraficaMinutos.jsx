import { ObtenerRegistro } from "../../../../../services/api";
import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts'
import { useSelector } from "react-redux";

const Pastel = () => {
  const categories = useSelector((state) => state.userSlice.categories);
  const toDos = useSelector((state) => state.userSlice.toDos);
  
  
  const _getCompletedCount = () => {
    return toDos.filter((todo) => todo.completed).length;
  };
  const _getInCompletedCount = () => {
    return toDos.filter((todo) => !todo.completed).length;
  };

  const state = {
    series: [_getCompletedCount(), _getInCompletedCount()], // IMPORTANTE!!
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
