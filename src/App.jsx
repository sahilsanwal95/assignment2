import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import EditUserForm from "./components/EditUserForm";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/users"
          element={isAuthenticated ? <UserList /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={isAuthenticated ? <EditUserForm /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
