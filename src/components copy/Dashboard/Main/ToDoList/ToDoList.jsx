import ToDoTable from "./ToDoTable/ToDoTable";
const ToDoList = ({ toDos, onDeleteToDo }) => {
  return (
    <>
      <div className="row w-100 my-2">
        <div className="col text-right">
          <button className="btn btn-success">Crear nueva tarea</button>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <ToDoTable toDos={toDos} onDeleteToDo={onDeleteToDo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
