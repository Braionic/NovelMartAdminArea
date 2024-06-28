import axios from "axios";
import { baseUrl } from "../baseUrl";

const uploadImages = async (files) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/upload/uploadimage`,
      files
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

const deleteImage = async (id) => {
  try {
    const deletedImage = await axios.delete(
      `${baseUrl}/api/upload/deleteImage/${id}`
    );
    if (deleteImage) {
      return deletedImage;
    }
  } catch (error) {
    return error.message;
  }
};

const imageServices = { uploadImages, deleteImage };
export default imageServices;
