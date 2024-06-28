import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/product/`);
  if (response.data) {
    console.log(response.data)
    return response.data;
  }
};

const pp = {title: "Samsumg GG",
  description: "it runs on the Android Operating system",
  price: 320,
  quantiy: 4,
  color: ["65d1e1627c680a725f778635"],
  brand: "Samsung",
  unit: "Carton",
  category:"Mobile Phones"
  }

const uploadProduct = async (product) => {
  const response = await axios.post(`${baseUrl}/api/product/`, product);
    const data = response.data;
    console.log(data)
    return response.data
  
};

export const productServices = {
  fetchProduct: fetchProducts,
  uploadProduct
};
