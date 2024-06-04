import axios from "axios";
import { baseUrl } from "../baseUrl";

async function getEnquiries() {
  const response = await axios.get(`${baseUrl}/api/enquiry/`);
  const data = response?.data;
  console.log(data)
  return data
}

const enquiryServices = {
  getEnquiries,
};

export default enquiryServices