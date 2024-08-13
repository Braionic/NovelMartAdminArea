import axios from "axios";
import { baseUrl } from "../baseUrl";

async function getEnquiries() {
  const response = await axios.get(`${baseUrl}/api/enquiry/`);
  const data = response?.data;
  console.log(data);
  return data;
}

async function deleteEnquery(id) {
  const response = await axios.delete(`${baseUrl}/api/enquiry/deleteenquiry/${id}`);
  console.log(response.data)
  if (response.data) {
    return response.data;
  }
}

async function getSingleEnq(id){
  const response = await axios.get(`${baseUrl}/api/enquiry/${id}`)

  if(response.data){
    return response.data
  }
}

async function updateEnq(data){
  try {
    const response = await axios.put(`${baseUrl}/api/enquiry/update/${data.id}`, {status: data.status})
    console.log(response, "uyome yo")
    if(response.data){
      return response.data
    }
  } catch (error) {
    return error
  }
}

const enquiryServices = {
  getEnquiries,
  deleteEnquery,
  getSingleEnq,
  updateEnq
};

export default enquiryServices;
