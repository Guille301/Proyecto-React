import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TiempoDiario = () => {
  const [minutosDiarios, setMinutosDiarios] = useState(0);
  const registros = useSelector((state) => state.userSlice.ejercicios);

  useEffect(() => {
    if (registros && Array.isArray(registros)) {
      
      const today = new Date().toISOString().split('T')[0];

     
      const totalTiempoDiario = registros
        .filter(item => item.fecha === today)
        .reduce((sum, item) => sum + item.tiempo, 0);

      setMinutosDiarios(totalTiempoDiario);
    } else {
      console.error("Formato de registros incorrecto:", registros);
    }
  }, [registros]); 


  return (
    <div className="row text-center desing">
      <h3>{minutosDiarios}</h3>
    </div>
  );
};

export default TiempoDiario;