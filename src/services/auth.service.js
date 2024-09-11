import axios from "axios";
const API_URL = import.meta.env.VITE_LCR_BACKEND_URL;

export const login = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Login successful");
  localStorage.setItem("token", response?.data?.token);
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", response?.data.role);
  localStorage.setItem("userId", response?.data.userId);
  localStorage.setItem("name", response?.data.name);
 


  console.log(response?.data);
  return response.data;
};

export const register = async (newData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    newData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Registration successful");
  

  console.log(response?.data);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await axios.get(
    `${API_URL}/auth/myprofile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  console.log("User info fetched successfully");
  console.log(response?.data);
  
  return response.data;
}

export const updateUserInfo = async (newData) => {
  const response = await axios.patch(
    `${API_URL}/auth/myprofile/edit`,
    newData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  console.log("User info updated successfully");
  console.log(response?.data);
  
  return response.data;
}
