import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchBlogs = async () => {
  const response = await axios.get(`${baseUrl}/api/blog`);
  if (response?.data) {
    return response.data;
  }
};

const createBlog = async (data)=>{
try {
  const response = await axios.post(`${baseUrl}/api/blog/`, data)
if(response?.data){
  return response.data
}
} catch (error) {
  return error.message
}
}



export const blogServices = {
  fetchB: fetchBlogs,
  createBlog
};
