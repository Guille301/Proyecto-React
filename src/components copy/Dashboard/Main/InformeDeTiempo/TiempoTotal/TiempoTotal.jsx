import "./Stats.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TiempoTotal = () => {
  const [minutosTotales, setMinutosTotales] = useState(0);
  const registros = useSelector((state) => state.userSlice.ejercicios);


  useEffect(() => {
    if (registros && Array.isArray(registros)) {
      
      const totalTiempo = registros.reduce((sum, item) => sum + item.tiempo, 0);
      setMinutosTotales(totalTiempo);
    } else {
      console.error("Formato de registros incorrecto:", registros);
    }
  }, [registros]); 

  return (
    <div className="row text-center desing">
      <h3>{minutosTotales}</h3>
    </div>
  );
};

export default TiempoTotal;