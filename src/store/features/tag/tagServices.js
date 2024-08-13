import axios from "axios";
import { baseUrl } from "../baseUrl";

const fetchTags = async () => {
  const response = await axios.get(`${baseUrl}/api/tag/`);

  if (response.data) {
    return response.data;
  }
};

const addTag = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/tag/create`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getSingleTag = async (id) => {
  const response = await axios.get(`${baseUrl}/api/tag/single/${id}`);
  if (response.data) {
    return response.data;
  }
};

const updateTag = async (data) => {
  try {
    const response = await axios.put(`${baseUrl}/api/tag/${data?.id}`, {title: data?.title});
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error.message;
  }
};

const deleteTag = async(id)=>{
const response = await axios.delete(`${baseUrl}/api/tag/${id}`)
console.log(response)
return response.data
}

export const TagServices = {
  getTags: fetchTags,
  addTag,
  getSingleTag,
  updateTag,
  deleteTag
};
