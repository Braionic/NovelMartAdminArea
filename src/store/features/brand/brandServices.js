import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchBrands = async () => {
  const response = await axios.get(`${baseUrl}/api/brand/`);

  if (response.data) {
    console.log(response.data);
    return response.data;
  }
};

const addBrand = async (data) => {
 try {
  const response = await axios.post(`${baseUrl}/api/brand/`, data);
    return response.data;
 } catch (error) {
  return error
 }
};

export const brandServices = {
  getBrands: fetchBrands,
  addBrand,
};
