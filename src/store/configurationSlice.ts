import { createSlice } from "@reduxjs/toolkit";
import { IConfigSaveRequest } from "../types/apiTypes";

const initialState: IConfigSaveRequest = {
    cloudProvider: "",
    params: []
}

export const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        changeCloudProvider: (state, action) => {
            state.cloudProvider = action.payload;
        },
        addParams: (state, action) => {
            const selectedParam = state.params.find(p => p.paramKey === action.payload.paramKey);
            if (selectedParam && action.payload.value === "") {
                state.params = state.params.filter(p => p.paramKey !== selectedParam.paramKey);
            } else if (selectedParam) {
                selectedParam.paramValue = action.payload.paramValue;
            } else {
                state.params.push(action.payload);
            } 
        },
        resetParams: (state) => {
            state = initialState;
        }
    }
});

export const { changeCloudProvider, addParams, resetParams } = configurationSlice.actions;
export default configurationSlice.reducer;