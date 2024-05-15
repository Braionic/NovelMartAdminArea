import axios from "axios";
import { baseUrl } from "../baseUrl";

const login = async (userCredentials) => {
  const response = await axios.post(
    `${baseUrl}/api/user/admin`,
    userCredentials
  );
  if (response?.data) {
    console.log("here i am", response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data;
};

export const authServices = {
  login,
};
