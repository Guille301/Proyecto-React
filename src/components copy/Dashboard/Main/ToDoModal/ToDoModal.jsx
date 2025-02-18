import { useRef, useState, useEffect } from "react";
import { agregarActividad, ObtenerActividades } from "../../../../services/api";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";

const ToDoModal = ({ onToggleModal, onAddToDo }) => {
  const inputTiempoRef = useRef();
  const inputFechaRef = useRef();
  const [actividades, setActividades] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState("");

  useEffect(() => {
    console.log("Actividades actualizadas:", actividades); // Verifica esto

    const fetchActividades = async () => {
      try {
        const userData = getUserDataFromLocalStorage();
        console.log("datos de usu:", userData); // Verifica esto

        if (userData && userData.apiKey) {
          const response = await ObtenerActividades(userData.apiKey, userData.id); // Pasa el apiKey aquí
          console.log("Respuesta de la API2:", response); // Verifica la respuesta
          setActividades(response);
        }
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };
    fetchActividades();
  }, []);

  const _onHandleClick = async () => {
    const tiempo = inputTiempoRef.current.value;
    const fecha = inputFechaRef.current.value;

    if (!selectedActividad || tiempo <= 0 || !fecha) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const userData = getUserDataFromLocalStorage();
      if (userData) {
        const { id, apiKey } = userData;
        const response = await agregarActividad(tiempo, fecha, id, apiKey, selectedActividad);
        
        const newToDo = {
          id: response.id, // Asumiendo que la API devuelve un ID
          title: response.nombre, // Si la API devuelve el nombre de la actividad
          completed: false,
        };

        onAddToDo(newToDo);
        onToggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Tarea</h5>
            <button type="button" className="close" onClick={onToggleModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Actividad</label>
                <select
                  className="form-control"
                  value={selectedActividad}
                  onChange={(e) => setSelectedActividad(e.target.value)}
                >
                  <option value="">Seleccione una actividad</option>
                  {actividades.map((actividad) => (
                    <option key={actividad.id} value={actividad.id}>
                      {actividad.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tiempo de la actividad</label>
                <input
                  type="text"
                  className="form-control"
                  ref={inputTiempoRef}
                />
              </div>
              <div className="form-group">
                <label>Fecha de la actividad</label>
                <input
                  type="date"
                  className="form-control"
                  ref={inputFechaRef}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={_onHandleClick}
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoModal;
