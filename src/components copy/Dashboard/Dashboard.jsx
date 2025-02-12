import Main from "./Main/Main";
import Header from "./Header/Header";
import { useState } from "react";

const Dashboard = () => {
  const [toDos, setToDos] = useState([
    { id: 1, title: "Lavarse los dientes", completed: true },
    { id: 2, title: "Hacer caso", completed: true },
    { id: 3, title: "Mirar Blippi", completed: true },
  ]);

  const _onDelete = (id) => {
    const filteredToDos = toDos.filter((t) => t.id !== id);
    setToDos(filteredToDos);
  };

  return (
    <div className="container-fluid">
      <Header />
      <Main toDos={toDos} onDeleteToDo={_onDelete} />
    </div>
  );
};

export default Dashboard;
