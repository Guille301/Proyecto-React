import { ObtenerRegistro } from "../../../../../services/api";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const TiempoDiario = () => {
  const [minutosDiarios, setMinutosDiarios] = useState(0);
  const userData = useSelector((state) => state.userSlice.userData);

  useEffect(() => {
    const fetchRegistros = async (apiKey, idUser) => {
      try {
        const response = await ObtenerRegistro(apiKey, idUser);
        console.log("Registros del usuario:", response);

        if (response.registros && Array.isArray(response.registros)) {
          const today = new Date().toISOString().split('T')[0];
          const totalTiempoDiario = response.registros
            .filter(item => item.fecha === today)
            .reduce((sum, item) => sum + item.tiempo, 0);
          setMinutosDiarios(totalTiempoDiario);
        } else {
          console.error("Formato de respuesta incorrecto:", response);
        }
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };

    if (userData && userData.apiKey) {
      fetchRegistros(userData.apiKey, userData.id);
    }
  }, [userData]);

console.log("Minutos diarios", minutosDiarios)


  return (
    <div className="row text-center desing">
     
            <h3>{minutosDiarios}</h3>
    </div>
    
  );
};

export default TiempoDiario;
