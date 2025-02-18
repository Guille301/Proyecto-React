import ChartContainer from "./ChartContainer/ChartContainer";
import Stats from "./Stats/Stats";
import ToDoList from "./ToDoList/ToDoList";
import ToDoModal from "./ToDoModal/ToDoModal";
import { useState } from "react";

const Main = ({ toDos, onDeleteToDo, onAddToDo }) => {
  const [showModal, setShowModal] = useState(false);

  const _onToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Stats />
      <ChartContainer />
      <ToDoList toDos={toDos} onDeleteToDo={onDeleteToDo} onToggleModal={_onToggleModal}/>
      {showModal && (
        <EjercicioModal onToggleModal={_onToggleModal} onAddToDo={onAddToDo} />
      )}
    </>
  );
};

export default Main;
