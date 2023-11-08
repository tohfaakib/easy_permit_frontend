import { createSlice } from "@reduxjs/toolkit";
import { GetSmartyAutoCompleteAddress } from "../services/smartyAutoCompleteAddress.service";
import { toast } from "react-toastify";

const smartyAutoCompleteAddressSlice = createSlice({
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

export default smartyAutoCompleteAddressSlice.reducer;