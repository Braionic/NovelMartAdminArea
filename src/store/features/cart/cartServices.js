import axios from "axios";
import { baseUrl } from "../baseUrl";

const token = JSON.parse(localStorage.getItem("user"))?.token;
console.log(token);

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const fetchAllOrders = async () => {
  const response = await axios.get(`${baseUrl}/api/user/user-order`, config);
  if (response?.data) {
    console.log(response.data)
    return response.date;
  }
};

export const fetchOrder = {
  fetchOrders: fetchAllOrders,
};
