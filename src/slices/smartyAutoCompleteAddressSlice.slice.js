import { createSlice } from "@reduxjs/toolkit";
import { GetSmartyAutoCompleteAddress, GetPermitValidation } from "../services/smartyAutoCompleteAddress.service";
import { toast } from "react-toastify";

export const smartyAutoCompleteAddressSlice = createSlice({
    name: "autoCompleteAddress",
    initialState: {
        smartyAutoCompleteAddressList: [],
        smartyAutoCompleteAddressLoading: false,
        smartyAutoCompleteAddressError: null,
    },
    reducers: {
        nullifyAutoCompleteAddress: (state) => {
            state.smartyAutoCompleteAddressList = [];
        }
    },
    extraReducers:
    (builder) => {
        builder.addCase(GetSmartyAutoCompleteAddress.pending, (state) => {
            state.smartyAutoCompleteAddressLoading = true
        });
        builder.addCase(GetSmartyAutoCompleteAddress.fulfilled, (state, action) => {
            toast.dismiss();

            state.smartyAutoCompleteAddressList = action.payload
            state.smartyAutoCompleteAddressLoading = false
            state.smartyAutoCompleteAddressError = null
        });
        builder.addCase(GetSmartyAutoCompleteAddress.rejected, (state, action) => {
            toast.dismiss();
            toast.error("Auto complete address error!")

            state.smartyAutoCompleteAddressLoading = false
            state.smartyAutoCompleteAddressError = action.error?.message
        })
    }
});

export const { nullifyAutoCompleteAddress } = smartyAutoCompleteAddressSlice.actions

export const getPermitValidationSlice = createSlice({
    name: "getPermitValidationSlice",
    initialState: {
        getPermitValidation: [],
        getPermitValidationLoading: false,
        getPermitValidationError: null,
    },
    reducers: {
        nullifyPermitValidation: (state) => {
            state.getPermitValidation = [];
        }
    },
    extraReducers:
    (builder) => {
        builder.addCase(GetPermitValidation.pending, (state) => {
            state.getPermitValidationLoading = true
        });
        builder.addCase(GetPermitValidation.fulfilled, (state, action) => {
            toast.dismiss();

            state.getPermitValidation = action.payload
            state.getPermitValidationLoading = false
            state.getPermitValidationError = null
        });
        builder.addCase(GetPermitValidation.rejected, (state, action) => {
            toast.dismiss();
            toast.error("Get permit validation error!")

            state.getPermitValidationLoading = false
            state.getPermitValidationError = action.error?.message
        })
    }
});

export const { nullifyPermitValidation } = getPermitValidationSlice.actions
