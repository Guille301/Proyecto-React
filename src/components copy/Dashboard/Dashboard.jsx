import Main from "./Main/Main";
import Header from "./Header/Header";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { onLogout,onLoadToDos } from "../../app/slices/userSlice";

const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatcher = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (userData) {
        const { id } = userData;
        const response = await getToDos(id);
        dispatcher(onLoadToDos(response));
      }
    }
    fetchData();
  }, []);




  return (
    <div className="container-fluid">
      <Header/>
      <Main/>
    </div>
  );
};

export default Dashboard;
