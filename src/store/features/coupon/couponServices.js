import axios from "axios";
import { baseUrl } from "../baseUrl";

const getCoupons = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/coupon/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

const getACoupon = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/coupon/${id}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
const addCoupon = async (data) => {
  const response = await axios.post(`${baseUrl}/api/coupon/createcoupon`, data);
  if (response?.data) {
    return response?.data;
  }
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/api/coupon/deletecoupon/${id}`
  );
  console.log(response.data, "deleted data");
  if (response.data) {
    return response.data;
  }
};

export const couponServices = {
  getCoupons,
  addCoupon,
  deleteCoupon,
  getACoupon
};
