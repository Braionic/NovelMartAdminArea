import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchBlogCategories = async () => {
  const response = await axios.get(`${baseUrl}/api/blogcategory/`);
  if (response.data) {
    return response.data;
  }
};

const createBlogCat = async (data) => {
  const response = await axios.post(`${baseUrl}/api/blogcategory/`, data);
  if (response.data) {
    return response.data;
  }
};

const getSingleBlogCat = async (id) => {
  const response = await axios.get(`${baseUrl}/api/blogcategory/single/${id}`);
  console.log(response.data);
  if (response.data) {
    return response.data;
  }
};

const updateBlogCat = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/api/blogcategory/${data.id}`, {
      title: data.title,
    });
    
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error.message;
  }
};

const deleteBlogCat = async (id) => {
  const response = await axios.delete(`${baseUrl}/api/blogcategory/${id}`);
  console.log(response);
  return response.data;
};

export const blogCategory = {
  fetchBlogCategory: fetchBlogCategories,
  createBlogCat,
  updateBlogCat,
  deleteBlogCat,
  getSingleBlogCat,
};
