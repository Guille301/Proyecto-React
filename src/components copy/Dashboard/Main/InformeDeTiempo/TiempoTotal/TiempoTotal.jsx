import "./Stats.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TiempoTotal = () => {
  const [minutosTotales, setMinutosTotales] = useState(0);
  const registros = useSelector((state) => state.userSlice.ejercicios);

  console.log("Registros de registros:", registros); // Verifica la estructura de la respuesta

  useEffect(() => {
    if (registros && Array.isArray(registros)) {
      // Calcular el tiempo total sumando los minutos de los registros
      const totalTiempo = registros.reduce((sum, item) => sum + item.tiempo, 0);
      console.log("Total tiempo calculado:", totalTiempo); // Verifica el valor calculado
      setMinutosTotales(totalTiempo);
    } else {
      console.error("Formato de registros incorrecto:", registros);
    }
  }, [registros]); // Dependencia: registros

  return (
    <div className="row text-center desing">
      <h3>{minutosTotales}</h3>
    </div>
  );
};

export default TiempoTotal;