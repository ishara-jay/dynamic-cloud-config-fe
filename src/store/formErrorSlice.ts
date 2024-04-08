import { createSlice } from "@reduxjs/toolkit";

interface IFormErrorMap {
    errors: any
}
const initialState: IFormErrorMap = {
    errors: {}
}

export const FormErrorSlice = createSlice({
    name: 'formErrors',
    initialState,
    reducers: {
        addError: (state, action) => {
            state.errors[action.payload.key] = action.payload.value
        },
        removeError: (state, action) => {
            if(state.errors[action.payload.key])
                state.errors[action.payload.key].error = false;
        },
        resetErrors: (state) => {
            state.errors = {};
        }
    }
});

export const { addError, removeError, resetErrors } = FormErrorSlice.actions;
export default FormErrorSlice.reducer;



