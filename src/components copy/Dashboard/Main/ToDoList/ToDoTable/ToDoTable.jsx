import ToDoTableRow from "./ToDoTableRow/ToDoTableRow";
import { ObtenerRegistro } from "../../../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onLoadEjercicios } from "../../../../../app/slices/userSlice";

const ToDoTable = () => {
  const registros = useSelector((state) => state.userSlice.ejercicios);
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await ObtenerRegistro(userData.apiKey, userData.id);
        dispatch(onLoadEjercicios(response.registros));
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };

    if (userData && userData.apiKey) {
      fetchRegistros();
    }
  }, [userData, dispatch]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Título</th>
          <th>Fecha</th>
          <th>Minutos</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((r) => (
          <ToDoTableRow  
            key={r.id}
            id={r.id}
            idActividad={r.idActividad}
            tiempo={r.tiempo}
            fecha={r.fecha}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ToDoTable;
