/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import assignmentReducer from './assignmentReducer';
import authReducer from './authReducer';
import courseReducer from './courseReducer';
import dialogFormReducer from './dialogFormReducer';
import groupReducer from './groupReducer';
import userReducer from './userReducer';
import api from '../apiServices';

export default combineReducers(
  {
    [groupReducer.name]: groupReducer.reducer,
    [userReducer.name]: userReducer.reducer,
    [assignmentReducer.name]: assignmentReducer.reducer,
    [dialogFormReducer.name]: dialogFormReducer.reducer,
    [courseReducer.name]: courseReducer.reducer,
    [authReducer.name]: authReducer.reducer,
    [api.reducerPath]: api.reducer,
  },
);
