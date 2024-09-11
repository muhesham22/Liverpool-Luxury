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


export const getBookings = async () => {
  return makeRequest("get", "/bookings/viewall");
};

export const getBookingById = async (id) => {
  return makeRequest("get", `/bookings/booking/${id}`);
};

export const addNewBooking = async (carId,bookingDetails) => {
  return makeRequest("post", `/bookings/${carId}`, bookingDetails);
};

export const updateBookingStatus = async (id, booking) => {
  return makeRequest("patch", `/bookings/status/${id}`, booking);
};

export const confirmBooking = async (id, booking) => {
  return makeRequest("patch", `/bookings/confirm/${id}`, booking);
};

export const deleteBooking = async (id) => {
  return makeRequest("delete", `/bookings/${id}`);
};

