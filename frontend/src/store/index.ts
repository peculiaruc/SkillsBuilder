import { configureStore } from '@reduxjs/toolkit';
import api from '../apiServices';
import authReducer from './authReducer';

const store = configureStore({
  reducer: {
    [authReducer.name]: authReducer.reducer,
    [api.reducerPath]: api.reducer,
  },
});

export default store;
