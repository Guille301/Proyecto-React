import ChartContainer from "./ChartContainer/ChartContainer";
import Stats from "./Stats/Stats";
import ToDoList from "./ToDoList/ToDoList";
import ToDoModal from "./ToDoModal/ToDoModal";
const Main = ({ toDos, onDeleteToDo }) => {
  return (
    <>
      <Stats />
      <ChartContainer />
      <ToDoList toDos={toDos} onDeleteToDo={onDeleteToDo} />
      {/* <ToDoModal /> */}
    </>
  );
};

export default Main;
