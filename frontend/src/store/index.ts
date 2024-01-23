import { configureStore } from '@reduxjs/toolkit';
import api from '../apiServices';
import rootReducer from './RootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
