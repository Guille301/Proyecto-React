import Main from "./Main/Main";
import Header from "./Header/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { onLogout } from "../../app/slices/userSlice";

const Dashboard = () => {
  const userData = useSelector((state) => state.userSlice.userData);

  return (
    <div className="container-fluid">
      <Header/>
      <Main/>
    </div>
  );
};

export default Dashboard;
