import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return <div className="text-center text-xl mt-10">Welcome to the Users Page!</div>;
};

export default UsersPage;
