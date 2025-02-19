import "./Stats.css";
import { ObtenerRegistro } from "../../../../services/api";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TiempoMinutos = () => {
  const [minutos, setMinutos] = useState(0);
  const userData = useSelector((state) => state.userSlice.userData);

  useEffect(() => {
    const fetchRegistros = async (apiKey, idUser) => {
      try {
        const response = await ObtenerRegistro(apiKey, idUser);
        console.log("Registros del usuario:", response);

        if (response.registros && Array.isArray(response.registros)) {
          const totalTiempo = response.registros.reduce((sum, item) => sum + item.tiempo, 0);
          setMinutos(totalTiempo);
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

  return (
    <div className="row text-center">
      <div className="col-md-4">
        <div className={`card stats-info`}>
          <div className="card-body">
            <h2>Tiempo total en minutos</h2>
            <h3>{minutos}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiempoMinutos;
