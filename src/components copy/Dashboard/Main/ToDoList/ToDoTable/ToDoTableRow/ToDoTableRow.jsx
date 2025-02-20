import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ObtenerActividades, EliminarRegistro } from "../../../../../../services/api";
import { onDeleteEjercicio } from "../../../../../../app/slices/userSlice";

const ToDoTableRow = ({ id, idActividad, tiempo, fecha }) => {
  const URL_IMAGENES = "https://movetrack.develotion.com/imgs/";
  const apiKey = useSelector((state) => state.userSlice.userData.apiKey);
  const idUser = useSelector((state) => state.userSlice.userData.id);

  const dispatcher = useDispatch();
  const [title, setTitle] = useState("");
  const [idImagen, setIdImagen] = useState("");
  const [actividades, setActividades] = useState([]);

  const _onDeleteRegistro = async () => {
    try {
      await EliminarRegistro(id, apiKey, idUser);
      dispatcher(onDeleteEjercicio(id));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  const getTitulo = (idActividad) => {
    const actividad = actividades.find((actividad) => actividad.id === idActividad);
    return actividad ? actividad.nombre : "Actividad no encontrada";
  };

  const getImagen = (idActividad) => {
    const actividad = actividades.find((actividad) => actividad.id === idActividad);
    return actividad ? actividad.imagen : "Actividad no encontrada";
  };

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await ObtenerActividades(apiKey, idUser);
        setActividades(response.actividades);
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    if (apiKey && idUser) {
      fetchActividades();
    }
  }, [apiKey, idUser]);

  useEffect(() => {
    if (actividades.length > 0) {
      const titulo = getTitulo(idActividad);
      const imagen = getImagen(idActividad);
      setTitle(titulo);
      setIdImagen(imagen);
    }
  }, [idActividad, actividades]);

  return (
    <tr>
      <td><img src={URL_IMAGENES + idImagen + ".png"} alt="" /></td>
      <td>{title}</td>
      <td>{fecha}</td>
      <td>{tiempo}</td>
      <td>
        <button className="btn btn-danger" onClick={_onDeleteRegistro}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ToDoTableRow;
