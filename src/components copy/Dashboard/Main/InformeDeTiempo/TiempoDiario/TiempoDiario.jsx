import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TiempoDiario = () => {
  const [minutosDiarios, setMinutosDiarios] = useState(0);
  const registros = useSelector((state) => state.userSlice.ejercicios);

  useEffect(() => {
    if (registros && Array.isArray(registros)) {
      // Obtener la fecha actual en formato YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];

      // Filtrar los registros por la fecha actual y sumar los minutos
      const totalTiempoDiario = registros
        .filter(item => item.fecha === today)
        .reduce((sum, item) => sum + item.tiempo, 0);

      console.log("Total tiempo diario:", totalTiempoDiario); // Verifica el valor calculado
      setMinutosDiarios(totalTiempoDiario);
    } else {
      console.error("Formato de registros incorrecto:", registros);
    }
  }, [registros]); // Dependencia: registros

  console.log("Minutos diarios", minutosDiarios); // Verifica el valor de minutosDiarios

  return (
    <div className="row text-center desing">
      <h3>{minutosDiarios}</h3>
    </div>
  );
};

export default TiempoDiario;