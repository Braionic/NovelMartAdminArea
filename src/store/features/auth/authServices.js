import axios from "axios";
import { baseUrl } from "../baseUrl";

const token = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).token: null
console.log(token)

const config = {
  headers: { Authorization: `Bearer ${token}`, Accept: "Application/json"}
};
const login = async (userCredentials) => {
  const response = await axios.post(
    `${baseUrl}/api/user/admin`,
    userCredentials
  );
  if (response?.data) {
    console.log("here i am", response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`${baseUrl}/api/user/all-orders`, config);
  if (response.data) {
    console.log(response.data)
    return response.data;
  }
};
export const authServices = {
  login,
  getAllOrders,
};
