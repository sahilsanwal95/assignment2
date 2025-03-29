import axios from "axios";

const API_URL = "https://reqres.in/api";

// ✅ Ensure `getUsers` function is properly exported
export const getUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { data: [] }; // Return empty data on error
  }
};

// ✅ Ensure `deleteUser` function is properly exported
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false };
  }
};
