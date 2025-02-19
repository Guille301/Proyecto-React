import Main from "./Main/Main";
import Header from "./Header/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { onLogout } from "../../app/slices/userSlice";

const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);

  const [toDos, setToDos] = useState([
    { id: 1, title: "Lavarse los dientes", completed: true },
    { id: 2, title: "Hacer caso", completed: true },
    { id: 3, title: "Mirar Blippi", completed: true },
  ]);

  const _onDelete = (id) => {
    const filteredToDos = toDos.filter((t) => t.id !== id);
    setToDos(filteredToDos);
  };

  const _onAddToDo = (newToDo) => {
    setToDos([newToDo, ...toDos]); 
  };

  return (
    <div className="container-fluid">
      <Header/>
      <Main toDos={toDos} onDeleteToDo={_onDelete} onAddToDo={_onAddToDo} />
    </div>
  );
};

export default Dashboard;
