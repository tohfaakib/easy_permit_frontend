import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

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


