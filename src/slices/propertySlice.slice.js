import { createSlice } from "@reduxjs/toolkit";
import { SaveProperty } from "../services/property.service";
import { toast } from "react-toastify";


export const savePropertySlice = createSlice({
    name: "savePropertySlice",
    initialState: {
        saveProperty: null,
        savePropertyLoading: false,
        savePropertyError: null,
    },
    reducers: {
        nullifyPermitValidation: (state) => {
            state.saveProperty = [];
        }
    },
    extraReducers:
    (builder) => {
        builder.addCase(SaveProperty.pending, (state) => {
            state.savePropertyLoading = true
        });
        builder.addCase(SaveProperty.fulfilled, (state, action) => {
            toast.dismiss();

            state.saveProperty = action.payload
            state.savePropertyLoading = false
            state.savePropertyError = null
        });
        builder.addCase(SaveProperty.rejected, (state, action) => {
            toast.dismiss();
            toast.error("Property Save Error!")

            state.savePropertyLoading = false
            state.savePropertyError = action.error?.message
        })
    }
});

