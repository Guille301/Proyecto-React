import ToDoTableRow from "./ToDoTableRow/ToDoTableRow";
const ToDoTable = ({ toDos, onDeleteToDo }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Completed?</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {toDos.map((toDo) => (
          <ToDoTableRow
            key={toDo.id}
            id={toDo.id}
            title={toDo.title}
            completed={toDo.completed}
            onDeleteToDo={onDeleteToDo}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ToDoTable;
