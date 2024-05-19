import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchBlogs = async () => {
  const response = await axios.get(`${baseUrl}/api/blog`);
  if (response?.data) {
    return response.data;
  }
};


export const blogServices = {
  fetchB: fetchBlogs,
};
