const ToDoTableRow = ({ id, title, completed, onDeleteToDo }) => {
  const _onDeleteToDo = () => {
    onDeleteToDo(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{completed ? "Yes" : "No"}</td>
      <td>
        <button className="btn btn-danger" onClick={_onDeleteToDo}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ToDoTableRow;
