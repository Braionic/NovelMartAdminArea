import axios from "axios";
import { baseUrl } from "../baseUrl";

async function getColors(){
    try {
        const response = await axios.get(`${baseUrl}/api/color/`);
        const data = response?.data;
        console.log(data)
        if(data && data.length > 0){
            return data
        }
    } catch (error) {
        console.log(error.message)
    }
}

const colorServices = {
    getColors,
}

export default colorServices