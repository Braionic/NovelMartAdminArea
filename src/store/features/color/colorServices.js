import axios from "axios";
import { baseUrl } from "../baseUrl";

async function getColors(){
    try {
        const response = await axios.get(`${baseUrl}/api/color/`);
        const data = response?.data;
        console.log(data)
        if(data){
            return data
        }
    } catch (error) {
        console.log(error.message)
    }
}

async function createColor(data){
    console.log(data)
    const response = await axios.post(`${baseUrl}/api/color/`, data)
    if(response.data){
        console.log(response.data)
        return response.data
    }
}
const colorServices = {
    getColors,
    createColor
}

export default colorServices