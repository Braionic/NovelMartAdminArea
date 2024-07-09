import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchBlogCategories = async () => {
  const response = await axios.get(`${baseUrl}/api/blogcategory/`);
  console.log(response)
  if (response.data) {
    return response.data
  }
};

const createBlogCat = async(data)=>{
const response = await axios.post(`${baseUrl}/api/blogcategory/`, data)
if(response.data){
  return response.data
}
}

export const blogCategory = {
    fetchBlogCategory: fetchBlogCategories,
    createBlogCat
}