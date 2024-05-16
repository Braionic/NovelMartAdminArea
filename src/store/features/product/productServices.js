import axios from "axios";
import { baseUrl } from "../baseUrl";


const fetchProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/product/`);
  if (response.data) {
    return response.data;
  }
};


export const productServices = {
  fetchProduct: fetchProducts,
};
