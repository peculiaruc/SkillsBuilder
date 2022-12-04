import { configureStore } from '@reduxjs/toolkit';
import api from '../apiServices';
import assignmentReducer from './assignmentReducer';
import authReducer from './authReducer';
import courseReducer from './courseReducer';
import dialogFormReducer from './dialogFormReducer';
import groupReducer from './groupReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    [groupReducer.name]: groupReducer.reducer,
    [userReducer.name]: userReducer.reducer,
    [assignmentReducer.name]: assignmentReducer.reducer,
    [dialogFormReducer.name]: dialogFormReducer.reducer,
    [courseReducer.name]: courseReducer.reducer,
    [authReducer.name]: authReducer.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([api.middleware]),
});

export default store;
