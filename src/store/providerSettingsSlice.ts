import { createSlice } from "@reduxjs/toolkit";
import { IProviderSettings } from "../types/store/storeTypes";

const initialState: IProviderSettings = {
    providers: [],
    selectedProvider: ""
}

export const providerSettingsSlice = createSlice({
    name: "providerSettings",
    initialState,
    reducers: {
        addProviders: (state, action) => {
            state.providers = action.payload
        },
        setSelectedProvider: (state, action) => {
            state.selectedProvider = action.payload;
        }
    }
})

export const { addProviders, setSelectedProvider } = providerSettingsSlice.actions;
export default providerSettingsSlice.reducer;