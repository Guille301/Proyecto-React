import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onLoadToDos, onLoadCategories } from "./slices/userSlice";
import { ObtenerRegistro } from "../services/api";

const CargarDatos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Obtener los datos de la API
        const data = await ObtenerRegistro();

        // Despachar las acciones para actualizar el store
        dispatch(onLoadToDos(data.toDos)); // Asegúrate de que `data.toDos` sea un array
        dispatch(onLoadCategories(data.categories)); // Asegúrate de que `data.categories` sea un array
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();
  }, [dispatch]);

  return null; // Este componente no renderiza nada, solo carga los datos
};

export default CargarDatos;