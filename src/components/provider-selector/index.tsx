import React, { useEffect, useState } from "react";
import DropDownSelector from "../common/dropdownSelector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedProvider } from "../../store/providerSettingsSlice";


export default function ProviderSelector () {

    const providers = useSelector((state: RootState) => state.providerSettings.providers);
    const dispatch = useDispatch();

    const [providerSelection, setProviderSelection] = useState<string[]>([])

    useEffect(() => {
        const providerArr: string[] = [];
        providers.map((provider: any )=> providerArr.push(provider.name));
        setProviderSelection(providerArr);
    }, [providers])

    const onChange = (value: string) => {
        dispatch(setSelectedProvider(value));
    }

    return (
        <DropDownSelector
            title="Cloud Provider"
            selectors={providerSelection}
            onSelect={onChange}
        />
    )
}