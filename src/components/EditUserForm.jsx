import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../api/reqresApi"; // Import API functions
import { useParams, useNavigate } from "react-router-dom";




const EditUserForm = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(id);
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user);
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Edit User</h2>
      {loading ? (
        <p>Loading user details...</p>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col space-y-3">
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            placeholder="First Name"
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            placeholder="Last Name"
            required
            className="p-2 border rounded"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            required
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUserForm;
