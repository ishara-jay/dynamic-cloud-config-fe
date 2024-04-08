import axios from "axios";
import { IConfigSaveRequest } from "../types/apiTypes";

export async function postConfig (paramDTO: IConfigSaveRequest) {
    const response = await axios.post("http://localhost:8080/configuration", paramDTO)
    return response.data
}