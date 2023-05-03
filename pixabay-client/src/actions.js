import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setImages } from './store';

export const fetchImages = createAsyncThunk(
  'app/fetchImages',
  async ({ category, page }, { dispatch }) => {
    const response = await axios.get(
      `http://localhost:3001/api/images/${category}/${page}`
    );
    console.log('API response:', response.data);
    dispatch(setImages(response.data));
  }
);
