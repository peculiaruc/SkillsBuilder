/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import api from '../apiServices';
import answerReducer from './answerReducer';
import assignmentReducer from './assignmentReducer';
import authReducer from './authReducer';
import courseReducer from './courseReducer';
import groupReducer from './groupReducer';
import lessonReducer from './lessonReducer';
import userReducer from './userReducer';

export default combineReducers(
  {
    [lessonReducer.name]: lessonReducer.reducer,
    [answerReducer.name]: answerReducer.reducer,
    [groupReducer.name]: groupReducer.reducer,
    [userReducer.name]: userReducer.reducer,
    [assignmentReducer.name]: assignmentReducer.reducer,
    [courseReducer.name]: courseReducer.reducer,
    [authReducer.name]: authReducer.reducer,
    [api.reducerPath]: api.reducer,
  },
);
