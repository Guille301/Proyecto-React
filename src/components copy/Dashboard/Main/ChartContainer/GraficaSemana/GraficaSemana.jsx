import React from "react";
import ReactApexChart from 'react-apexcharts';
import { useSelector } from "react-redux";

const Barras = () => {
  const Fechas = useSelector((state) => state.userSlice.Fechas);
  const MinutosFechas = useSelector((state) => state.userSlice.MinutosFechas);

  console.log("Fechas", Fechas);
  console.log("Minutos fechas", MinutosFechas);

  const [state, setState] = React.useState({
    series: [{
      name: 'Minutos',
      data: MinutosFechas, // Array de números
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
        categories: Fechas, // Array de strings
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