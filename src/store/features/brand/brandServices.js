import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchBrands = async () => {
  const response = await axios.get(`${baseUrl}/api/brand/`);

  if (response.data) {
    console.log(response.data);
    return response.data;
  }
};

export const brandServices = {
  getBrands: fetchBrands,
};
