
import ToDoList from "./ToDoList/ToDoList";
import EjercicioModal from "./EjercicioModal/EjercicioModal";
import Graficos from "./ChartContainer/ChartContainer"
import Evolucion from "./EvolucionPersonal/EvolucionPersonal"
import InformeDeTiempo from "../Main/InformeDeTiempo/InformeDeTiempo"


import { useState } from "react";


const Main = () => {
  const [showModal, setShowModal] = useState(false);

  const _onToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      

      <InformeDeTiempo/>
      <Graficos/>
      <Evolucion/>
      <ToDoList onToggleModal={_onToggleModal}/>
      {showModal && (
        <EjercicioModal onToggleModal={_onToggleModal} />
      )}
    </>
  );
};

export default Main;
