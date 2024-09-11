import axios from "axios";

const API_URL = import.meta.env.VITE_LCR_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleResponse = (response) => {
  console.log(response.data.message);
  console.log(response.data);
  return response.data;
};

const handleError = (error) => {
  if (error.response && error.response.status === 401|| error.response.status === 403) {
    console.log("User is unauthorized. Logging out...");
    const itemsToRemove = ["token", "userId", "role", "name"];
    itemsToRemove.forEach((item) => localStorage.removeItem(item));
    localStorage.setItem("isLoggedIn", false);
    window.location.href = "/";
  } else {
    console.error("Error occurred:", error);
  }
  throw error;
};

const makeRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getAllCars = async () => {
  return makeRequest("get", "/cars/viewall");
};

export const getCarById = async (id) => {
  return makeRequest("get", `/cars/${id}`);
};

export const addNewCar = async (carDetails) => {
    const formData = new FormData();
    formData.append("brand", carDetails.brand);
    formData.append("name", carDetails.name);
    formData.append("year", carDetails.year);
    formData.append("type", carDetails.type);
    formData.append("transmissionType", carDetails.transmissionType);
    formData.append("powerSystem", carDetails.powerSystem);
    formData.append("seats", carDetails.seats);
    formData.append("rentalPrice", carDetails.rentalPrice);
    formData.append("description", carDetails.description);
    formData.append("doors", carDetails.doors);
    formData.append("images", carDetails.images);

    const response = await axios.post(`${API_URL}/cars`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("Car added successfully:", response.data);
  
};

export const updateCar = async (id, car) => {
  console.log("Updating car with id:", id);
  return makeRequest("patch", `/cars/${id}`, car);
};

export const deleteCar = async (id) => {
  return makeRequest("delete", `/cars/${id}`);
};

export const getFilteredCars = async (filters) => {
  return makeRequest("post", "/cars/filter", filters);
};

//filter cars by date 

export const getAvailableCars = async (dates) => {
  return makeRequest("get", `/cars/filter?startDate=${dates.startDate}&endDate=${dates.endDate}`);
};