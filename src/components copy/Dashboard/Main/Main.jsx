import ChartContainer from "./ChartContainer/ChartContainer";
import Stats from "./TiempoTotal/TiempoTotal";
import TiempoDiario from "./TiempoDiario/TiempoDiario";
import ToDoList from "./ToDoList/ToDoList";
import EjercicioModal from "./EjercicioModal/EjercicioModal";
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
      <ChartContainer />
      <ToDoList onToggleModal={_onToggleModal}/>
      {showModal && (
        <EjercicioModal onToggleModal={_onToggleModal} />
      )}
    </>
  );
};

export default Main;
