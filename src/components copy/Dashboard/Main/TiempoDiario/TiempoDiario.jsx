import { ObtenerRegistro } from "../../../../services/api";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";
import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import "./styleDiario.css";




const TiempoDiario = () => {
  const [minutos, setMinutos] = useState(0); // Inicializa el estado con 0

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const userData = getUserDataFromLocalStorage();
        if (userData && userData.apiKey) {
          const response = await ObtenerRegistro(userData.apiKey, userData.id);
          console.log("Registros del usuario:", response);

          if (response.registros && Array.isArray(response.registros)) {
            const hoy = new Date().toISOString().split("T")[0];

            const filtroDiario = response.registros.filter(t => t.fecha === hoy);

            const totalTiempo = filtroDiario.reduce((sum, item) => sum + item.tiempo, 0);

            setMinutos(totalTiempo);
          } else {
            console.error("Formato de respuesta incorrecto:", response);
          }
        }
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };
  
    fetchRegistros();
  }, []);

  return (
    <div className="row text-end">
      <div className="col-md-4">
        <div className={`card design`}>
          <div className="card-body">
            <h2>Tiempo diario</h2>
            <h3>{minutos}</h3> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiempoDiario;
