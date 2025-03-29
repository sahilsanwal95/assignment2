import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/reqresApi"; // Ensure correct import
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(page);
      if (res && res.data) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="border p-3 rounded-lg shadow">
                <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full mx-auto" />
                <p className="text-center mt-2">{user.first_name} {user.last_name}</p>
                <p className="text-center text-gray-500">{user.email}</p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => navigate(`/edit/${user.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
      <div className="mt-5 flex justify-center space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList; // ✅ Ensure this line exists
