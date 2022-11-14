import { configureStore } from '@reduxjs/toolkit';
import api from '../apiServices';
import authReducer from './authReducer';
import courseReducer from './courseReducer';

const store = configureStore({
  reducer: {
    [courseReducer.name]: courseReducer.reducer,
    [authReducer.name]: authReducer.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([api.middleware]),
});

export default store;
