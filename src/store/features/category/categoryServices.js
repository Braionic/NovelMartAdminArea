import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchCategories = async () => {
  const response = await axios.get(`${baseUrl}/api/productcategory/`);
  if (response?.data) {
    return response.data;
  }
};

const createCategory = async (data) => {
  const response = await axios.post(`${baseUrl}/api/productcategory/`, data);
  if(response?.data){
    return response.data
  }
};
export const categoryServices = {
  getCatgories: fetchCategories,
  createCategory
};
