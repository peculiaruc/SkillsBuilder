import { configureStore } from '@reduxjs/toolkit';
import api from '../apiServices';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
});

export default store;
