import { IConfigSaveRequest } from "../types/apiTypes";
import { IInputConfigs } from "../types/formTypes";
import { IProviderSettings } from "../types/store/storeTypes";

export function validateWithRegex (inputString: string, regex?: string) : boolean {
    if (!regex) {
        return true;
    }
    const reg = new RegExp(regex);
    return reg.test(inputString);
}

export function validateDropdown (selectedOption: string, givenOptions: string[]) : boolean {
    return givenOptions.includes(selectedOption);
};

export function validateFormInputs (configurations: IConfigSaveRequest, providereSettings: IProviderSettings) : boolean {
    const selectedProvider = providereSettings.providers.find(p => p.name === providereSettings.selectedProvider);
    if (!selectedProvider)
        return false;

    selectedProvider.fields.forEach((field: IInputConfigs) => {
        if(field.required && !configurations.params.find(param => param.paramKey === field.label))
            return false;
    });

    return true;
}