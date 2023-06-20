import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const AdminDashboard = () => {
  const { getUserRole } = useContext(AuthContext);
  return <p className="p-4">{`Welcome to ${getUserRole()} Dashboard`}</p>;
};

export default AdminDashboard;
