import ToDoTableRow from "./ToDoTableRow/ToDoTableRow";
import { ObtenerRegistro } from "../../../../../services/api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const ToDoTable = () => {

  const registros = useSelector((state) => state.userSlice.ejercicios);

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
