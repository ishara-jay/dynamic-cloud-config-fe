import axios from "axios";
import { IConfigSaveRequest } from "../types/apiTypes";

export async function postConfig (paramDTO: IConfigSaveRequest) {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/configuration`, paramDTO)
    return response.data
}