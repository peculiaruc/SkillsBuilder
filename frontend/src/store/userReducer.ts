import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import userService from '../apiServices/userService';
import { GetAllUsersResponse, UserType } from '../interfaces/UserType';

type InitialStateType = {
  users:UserType[]
};

type ReducerState = {
  users: InitialStateType
};

const userReducer = createSlice({
  name: 'users',
  initialState: {
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
      );
  },
});

export const useUsers = () => useSelector((state:ReducerState) => state.users.users);
export default userReducer;
