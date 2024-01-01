import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = process.env.REACT_APP_MAIN_URL

export const SaveProperty = createAsyncThunk(
  "property/SaveProperty",
  async (data) => {
    const response = await axios.post(`${BASE_URL}/api/property-save`, data)
    return response.data
  }
)