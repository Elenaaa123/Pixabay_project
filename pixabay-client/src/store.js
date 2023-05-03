import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const initialState = {
  images: [],
  category: 'sports',
  page: 1,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setImages, setCategory, setPage } = appSlice.actions;

const store = configureStore({
  reducer: appSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
