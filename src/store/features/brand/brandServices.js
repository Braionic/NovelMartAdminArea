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
    return error;
  }
};

const getSingleBrand = async (id) => {
  const response = await axios.get(`${baseUrl}/api/brand/single/${id}`);
  if (response.data) {
    return response.data;
  }
};

const updateBrand = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/api/brand/${data?.id}`, {title: data?.title});
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error.message;
  }
};

const deleteBrand = async(id)=>{
const response = await axios.delete(`${baseUrl}/api/brand/${id}`)
console.log(response)
return response.data
}

export const brandServices = {
  getBrands: fetchBrands,
  addBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand
};
