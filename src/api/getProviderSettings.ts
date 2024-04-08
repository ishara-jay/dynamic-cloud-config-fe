import axios from "axios";
import { IProviderSettings } from "../types/store/storeTypes";

export async function getProviderSettings (): Promise<IProviderSettings> {
    const response: any = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider-settings`, 
        {
            headers : {
                'Access-Control-Allow-Origin' : '*'
            }
        }
    );
    return response.data; 
}