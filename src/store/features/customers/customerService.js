import axios from "axios";
import { baseUrl } from "../baseUrl";

const getCustomers = async () => {
  const response = await axios.get(`${baseUrl}/api/user/all-users`);
  console.log("axios1", response.data);
  if (response.data) {
    console.log("axios", response.data);
    return response.data;
  }
};

export const customerServices = { allCustomers: getCustomers };
