import { ChangeEventHandler } from "react";

export interface IFormConfigs {
    inputConfig: IInputConfigs[]
}
  
export interface IInputConfigs {
    label:string,
    regex?: string,
    possibleValues?: string[],
    required?: boolean,
    type: "PRIMITIVE" | "HEADER" | "DROPDOWN",
    onChange: Function
    error?: boolean
    errorString? : string
}

export interface IDropdownProps {
    title: string;
    selectors: string[];
    onSelect: Function;
    error?: boolean
    errorString? : string
}

export interface IFormError {
    error: boolean;
    message: string;
}