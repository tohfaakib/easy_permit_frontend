import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = process.env.REACT_APP_MAIN_URL

export const GetSmartyAutoCompleteAddress = createAsyncThunk(
  "autocomplete/GetSmartyAutoCompleteAddress",
  async (address) => {
    const response = await axios.get('https://us-autocomplete-pro.api.smarty.com/lookup', {
      params: {
        'key': '184082552766098498',
        'search': address,
        'license': 'us-autocomplete-pro-cloud'
      },
    });
    return response.data?.suggestions
  }

);

export const GetPermitValidation = createAsyncThunk(
  "autocomplete/GetPermitValidation",
  async (data) => {
    const response = await axios.post(`${BASE_URL}/api/get-permit-validation`, data?.value)
    return response.data
  }
)