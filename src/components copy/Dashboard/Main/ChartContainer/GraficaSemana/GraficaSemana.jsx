import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import { useSelector } from "react-redux";

const Barras = () => {
  const registros = useSelector((state) => state.userSlice.ejercicios);

  
  const fechas = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    fechas.push(fecha.toISOString().split("T")[0]); 
  }

  const minutosPorFecha = fechas.map((fecha) => {
    const registrosDelDia = registros.filter((item) => item.fecha === fecha);
    const totalMinutos = registrosDelDia.reduce((sum, item) => sum + item.tiempo, 0);
    return totalMinutos;
  });

  const [state, setState] = useState({
    series: [{
      name: 'Minutos',
      data: minutosPorFecha, 
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        background: "#FFFFFF", 
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', 
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " min"; 
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#000000"] 
        }
      },
      xaxis: {
        categories: fechas, 
        position: 'bottom', 
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: "#000000", 
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true, 
          style: {
            colors: "#000000", 
          },
          formatter: function (val) {
            return val + " min"; 
          }
        }
      },
      title: {
        text: 'Cantidad de minutos en la semana',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#000000' 
        }
      }
    },
  });

  
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [{
        name: 'Minutos',
        data: minutosPorFecha,
      }],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: fechas,
        },
      },
    }));
  }, [registros]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Barras;