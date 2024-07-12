import axios from "axios";
import { baseUrl } from "../baseUrl";

const getCoupons = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/coupon/`);
    console.log(response.data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

const addCoupon = async (data) => {
  const response = await axios.post(`${baseUrl}/api/coupon/createcoupon`, data);
  console.log(response?.data)
  if (response?.data) {
    return response?.data;
  }
};

export const couponServices = {
  getCoupons,
  addCoupon,
};
