import { IInputConfigs } from "./formTypes";

export interface IProviderResponse {
    providers: IProviderConfig[]
}

interface IProviderConfig {
    name: string;
    fields: IInputConfigs[]
}

export interface IConfigSaveRequest {
    cloudProvider: string;
    params: IParam[]
}

interface IParam {
    paramType: string;
    paramKey: string;
    paramValue: string;
}

export interface IConfigSaveResponse {
    recordId: number;
    cloudProvider: string;
}