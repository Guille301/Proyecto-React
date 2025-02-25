import "./Stats.css";
import { ObtenerRegistro } from "../../../../../services/api";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TiempoTotal = () => {
  const [minutosTotales, setMinutosTotales] = useState(0);
  const userData = useSelector((state) => state.userSlice.userData);

  useEffect(() => {
    console.log("userData:", userData); // Verifica que userData tenga los valores correctos

    const fetchRegistros = async (apiKey, idUser) => {
      try {
        const response = await ObtenerRegistro(apiKey, idUser);
        console.log("Registros del usuario:", response); // Verifica la estructura de la respuesta

        if (response.registros && Array.isArray(response.registros)) {
          const totalTiempo = response.registros.reduce((sum, item) => sum + item.tiempo, 0);
          console.log("Total tiempo:", totalTiempo); // Verifica el valor calculado
          setMinutosTotales(totalTiempo);
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

  useEffect(() => {
    console.log("minutosTotales actualizado:", minutosTotales); // Verifica que el estado se actualice
  }, [minutosTotales]);

  return (
    <div className="row text-center desing">
      <h3>{minutosTotales}</h3>
    </div>
  );
};

export default TiempoTotal;