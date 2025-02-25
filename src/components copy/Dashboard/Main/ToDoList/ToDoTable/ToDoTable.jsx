import ToDoTableRow from "./ToDoTableRow/ToDoTableRow";
import { ObtenerRegistro } from "../../../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { onLoadEjercicios } from "../../../../../app/slices/userSlice";

const ToDoTable = () => {
  const registros = useSelector((state) => state.userSlice.ejercicios);
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("todos");

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterRegistros = (registros) => {
    const now = new Date();
    switch (filter) {
      case "semana":
        return registros.filter((r) => {
          const registroDate = new Date(r.fecha);
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return registroDate >= oneWeekAgo && registroDate <= now;
        });
      case "mes":
        return registros.filter((r) => {
          const registroDate = new Date(r.fecha);
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return registroDate >= oneMonthAgo && registroDate <= now;
        });
      case "all":
      default:
        return registros;
    }
  };

  const filteredRegistros = filterRegistros(registros);

  return (
    <div>
      <label htmlFor="filter">Mostrar:</label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="todos">Todos</option>
        <option value="semana">Última semana</option>
        <option value="mes">Último mes</option>
      </select>
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
          {filteredRegistros.map((r) => (
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
    </div>
  );
};

export default ToDoTable;
