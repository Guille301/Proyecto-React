import { useRef, useState, useEffect } from "react"; // Importamos hooks de React
import { agregarActividad, ObtenerActividades } from "../../../../services/api"; // Importamos las funciones de la API
import { getUserDataFromLocalStorage } from "../../../../utils/utils"; // Función para obtener datos del usuario almacenados

// Componente ToDoModal
const ToDoModal = ({ onToggleModal, onAddToDo }) => {
  // Referencias para obtener valores de los inputs
  const inputTiempoRef = useRef();
  const inputFechaRef = useRef();
  const inputActividadRef = useRef();

  // Estado para almacenar la lista de actividades disponibles
  const [actividades, setActividades] = useState([]);
  // Estado para la actividad seleccionada por defecto
  const [selectedActividad, setSelectedActividad] = useState("");

  // useEffect que se ejecuta cuando el componente se monta para cargar actividades desde la API
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const userData = getUserDataFromLocalStorage(); // Obtener datos del usuario desde localStorage
        if (userData && userData.apiKey) {
          const response = await ObtenerActividades(userData.apiKey, userData.id); // Llamar a la API para obtener actividades
          setActividades(response); // Guardar actividades en el estado
          if (response.length > 0) {
            setSelectedActividad(response[0].id); // Seleccionar la primera actividad por defecto
          }
        }
      } catch (error) {
        console.error("Error al obtener actividades:", error); // Captura errores en la obtención de actividades
      }
    };
    fetchActividades();
  }, []); // Se ejecuta solo una vez al montar el componente





  // Función para manejar el clic en el botón de crear actividad
  const _onHandleClick = async () => {
    const tiempo = inputTiempoRef.current.value; // Obtener valor de tiempo
    const fecha = inputFechaRef.current.value; // Obtener valor de fecha
    const actividad = inputActividadRef.current.value; // Obtener la actividad seleccionada

    // Validación: verificar que los campos no estén vacíos o sean inválidos
    if (!actividad || tiempo <= 0 || !fecha) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const userData = getUserDataFromLocalStorage(); // Obtener datos del usuario
      if (userData) {
        const { id, apiKey } = userData;
        // Llamar a la API para agregar la actividad
        const response = await agregarActividad(tiempo, fecha, id, apiKey, actividad);

        // Crear un objeto con la nueva tarea
        const newToDo = {
          id: response.id,
          title: response.nombre,
          completed: false,
        };

        onAddToDo(newToDo); // Llamar función para agregar la tarea a la lista
        onToggleModal(); // Cerrar el modal después de agregar la tarea
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Actividades que llegan", actividades); // Debugging: muestra las actividades en la consola

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)", // Fondo oscuro semitransparente para el modal
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000, // Asegura que el modal esté por encima del resto de la UI
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Tarea</h5>
            <button type="button" className="close" onClick={onToggleModal}>
              <span>&times;</span> {/* Botón para cerrar el modal */}
            </button>
          </div>
          <div className="modal-body">
            <form>
              
              
               {/* Seleccion por id de forma provisoria */}
               <div className="form-group">
                <label>Tipo de actividad</label>
                <input type="number" className="form-control" ref={inputActividadRef} />
              </div>
              
              
              
              {/* Campo de selección de actividad 
              <div className="form-group">
                <label>Actividad</label>
                <select name="actividad" id="actividad" className="form-control" ref={inputActividadRef}>
                  {actividades.length > 0 ? (
                    actividades.map((actividad) => (
                      <option key={actividad.id} value={actividad.id}>
                        {actividad.nombre}
                      </option>
                    ))
                  ) : (
                    <option>Cargando actividades...</option> // Mensaje mientras se cargan las opciones
                  )}
                </select>
              </div>*/}

              {/* Campo para ingresar el tiempo de la actividad */}
              <div className="form-group">
                <label>Tiempo de la actividad</label>
                <input type="number" className="form-control" ref={inputTiempoRef} />
              </div>

              {/* Campo para seleccionar la fecha de la actividad */}
              <div className="form-group">
                <label>Fecha de la actividad</label>
                <input type="date" className="form-control" ref={inputFechaRef} />
              </div>

              {/* Botón para crear la actividad */}
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