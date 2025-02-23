import React from "react";
import ReactApexChart from 'react-apexcharts';
import { useSelector } from "react-redux";

const ApexChart = () => {
  const toDos = useSelector((state) => state.userSlice.toDos) || [];

  // Función para obtener el nombre del día de la semana
  const getDayName = (dateString) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  // Procesar los datos para agrupar minutos por día de la semana
  const processData = () => {
    const minutesByDay = {};

    toDos.forEach((item) => {
      const dayName = getDayName(item.fecha); // Obtener el nombre del día
      if (!minutesByDay[dayName]) {
        minutesByDay[dayName] = 0; // Inicializar el contador de minutos para el día
      }
      minutesByDay[dayName] += item.tiempo; // Sumar los minutos
    });

    // Convertir el objeto en un array de { x: día, y: minutos }
    return Object.keys(minutesByDay).map((day) => ({
      x: day,
      y: minutesByDay[day],
    }));
  };

  // Datos procesados para la gráfica
  const series = [{
    name: "Minutos",
    data: processData(),
  }];

  // Opciones de la gráfica
  const options = {
    chart: {
      type: 'bar',
      height: 380,
      background: "white", // Fondo blanco
    },
    xaxis: {
      type: 'category',
      title: {
        text: 'Día de la semana',
      },
    },
    yaxis: {
      title: {
        text: 'Minutos',
      },
    },
    title: {
      text: 'Minutos registrados por día de la semana',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} minutos`;
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;