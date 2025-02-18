import { useRef, useState, useEffect } from "react";
import { agregarActividad, ObtenerActividades } from "../../../../services/api";
import { getUserDataFromLocalStorage } from "../../../../utils/utils";

const ToDoModal = ({ onToggleModal, onAddToDo }) => {
  const inputTiempoRef = useRef();
  const inputFechaRef = useRef();
  const inputActividadRef = useRef();

  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const userData = getUserDataFromLocalStorage();
        if (userData && userData.apiKey) {
          const response = await ObtenerActividades(userData.apiKey, userData.id);
          setActividades(response.actividades);
        }
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    fetchActividades();

    // Intento traer las tareas del local storage pero no esta funcionando
    const savedToDos = JSON.parse(localStorage.getItem("userToDos")) || [];
    setStoredToDos(savedToDos);
  }, []);

  const _onHandleClick = async () => {
    const tiempo = inputTiempoRef.current.value;
    const fecha = inputFechaRef.current.value;
    const actividad = inputActividadRef.current.value;

    if (!actividad || tiempo <= 0 || !fecha) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const userData = getUserDataFromLocalStorage();
      if (userData) {
        const { id, apiKey } = userData;
        const response = await agregarActividad(tiempo, fecha, id, apiKey, actividad);

        const newToDo = {
          id: response.id,
          title: response.nombre,
          completed: false,
        };

        const updatedToDos = [...storedToDos, newToDo];

        // Guardar en localStorage
        localStorage.setItem("userToDos", JSON.stringify(updatedToDos));
        setStoredToDos(updatedToDos);

        onAddToDo(newToDo);
        onToggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };


console.log("Guardado en local sotrage",storedToDos);


  console.log("Actividades que llegan de la api", actividades);

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
                <select name="actividad" id="actividad" ref={inputActividadRef} className="form-control">
                  {actividades.length > 0 ? (
                    actividades.map((actividad) => (
                      <option key={actividad.id} value={actividad.id}>
                        {actividad.nombre}
                      </option>
                    ))
                  ) : (
                    <option>Cargando actividades...</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>Tiempo de la actividad</label>
                <input type="number" className="form-control" ref={inputTiempoRef} />
              </div>

              <div className="form-group">
                <label>Fecha de la actividad</label>
                <input type="date" className="form-control" ref={inputFechaRef} />
              </div>

              <button type="button" className="btn btn-primary" onClick={_onHandleClick}>
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
