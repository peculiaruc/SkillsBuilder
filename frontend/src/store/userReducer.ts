import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import userService from '../apiServices/userService';
import {
  UserType,
  GetAllUsersResponse,
  GetAllAdminsResponse,
  GetAllAuthorsResponse,
  GetAllLearnersResponse,
} from '../interfaces/UserType';

type InitialStateType = {
  users:UserType[]
  admins:UserType[]
  learners:UserType[]
  authors:UserType[]
};

type ReducerState = {
  users: InitialStateType
};

const userReducer = createSlice({
  name: 'users',
  initialState: {
    learners: [],
    authors: [],
    admins: [],
    users: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        userService.endpoints.getAllUsers.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAllUsersResponse>) => {
          state.users = action.payload.data.users;
        },
      ).addMatcher(
        userService.endpoints.getAllAdmins.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAllAdminsResponse>) => {
          state.admins = action.payload.data.admins;
        },
      ).addMatcher(
        userService.endpoints.getAllAuthors.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAllAuthorsResponse>) => {
          state.authors = action.payload.data.authors;
        },
      ).addMatcher(
        userService.endpoints.getAllLearners.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetAllLearnersResponse>) => {
          state.learners = action.payload.data.learners;
        },
      );
  },
});

export const useUsers = () => useSelector((state:ReducerState) => state.users.users);
export const useAdmins = () => useSelector((state:ReducerState) => state.users.admins);
export const useAuthors = () => useSelector((state:ReducerState) => state.users.authors);
export const useLearners = () => useSelector((state:ReducerState) => state.users.learners);
export default userReducer;
