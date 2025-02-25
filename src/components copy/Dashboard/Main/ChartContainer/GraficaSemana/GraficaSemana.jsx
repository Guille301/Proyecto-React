import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import { useSelector } from "react-redux";

const Barras = () => {
  const registros = useSelector((state) => state.userSlice.ejercicios);

  // Generar fechas de los últimos 7 días
  const fechas = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    fechas.push(fecha.toISOString().split("T")[0]); // Formato YYYY-MM-DD
  }
  console.log("Fechas generadas:", fechas);

  // Calcular minutos por fecha
  const minutosPorFecha = fechas.map((fecha) => {
    const registrosDelDia = registros.filter((item) => item.fecha === fecha);
    const totalMinutos = registrosDelDia.reduce((sum, item) => sum + item.tiempo, 0);
    return totalMinutos;
  });
  console.log("Minutos por fecha:", minutosPorFecha);

  // Estado del gráfico
  const [state, setState] = useState({
    series: [{
      name: 'Minutos',
      data: minutosPorFecha, // Array de números
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        background: "#FFFFFF", // Fondo blanco
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " min"; // Mostrar los minutos en las etiquetas
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#000000"] // Color negro para las etiquetas de las barras
        }
      },
      xaxis: {
        categories: fechas, // Array de strings
        position: 'bottom', // Mover las etiquetas del eje X hacia abajo
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: "#000000", // Color negro para las etiquetas del eje X
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
          show: true, // Mostrar etiquetas del eje Y
          style: {
            colors: "#000000", // Color negro para las etiquetas del eje Y
          },
          formatter: function (val) {
            return val + " min"; // Formato de las etiquetas del eje Y
          }
        }
      },
      title: {
        text: 'Cantidad de minutos en la semana',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#000000' // Color negro para el título
        }
      }
    },
  });

  // Actualizar el estado cuando cambien los registros
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