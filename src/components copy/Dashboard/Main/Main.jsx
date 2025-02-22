import Stats from "./TiempoTotal/TiempoTotal";
import TiempoDiario from "./TiempoDiario/TiempoDiario";
import ToDoList from "./ToDoList/ToDoList";
import EjercicioModal from "./EjercicioModal/EjercicioModal";
import Graficos from "./ChartContainer/ChartContainer"
import { useState } from "react";


const Main = () => {
  const [showModal, setShowModal] = useState(false);

  const _onToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Stats />
      <TiempoDiario />
      <Graficos/>
      <ToDoList onToggleModal={_onToggleModal}/>
      {showModal && (
        <EjercicioModal onToggleModal={_onToggleModal} />
      )}
    </>
  );
};

export default Main;
