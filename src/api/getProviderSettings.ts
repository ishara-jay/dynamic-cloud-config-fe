import axios from "axios";
import { IProviderSettings } from "../types/store/storeTypes";

export async function getProviderSettings (): Promise<IProviderSettings> {
    const response: any = await axios.get(
        "http://localhost:8080/provider-settings", 
        {
            headers : {
                'Access-Control-Allow-Origin' : '*'
            }
        }
    );
    return response.data; 
}