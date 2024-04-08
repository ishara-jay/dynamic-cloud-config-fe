import { IInputConfigs } from "../formTypes";

export interface IProviderSettings {
    providers: IProvider[],
    selectedProvider: string
}

export interface IProvider {
    name: string;
    fields: IInputConfigs[]
}

