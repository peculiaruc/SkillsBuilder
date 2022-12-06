import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '.';
import groupService from '../apiServices/groupService';
import userService from '../apiServices/userService';
import { GetMyGroupsResponse, GroupType } from '../interfaces/GroupTypes';

type InitialStateType = {
  groups: GroupType[],
  joined: GroupType[],
};

const groupReducer = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    joined: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        userService.endpoints.getUserGroups.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetMyGroupsResponse>) => {
          state.joined = action.payload.data.groups;
        },
      )
      .addMatcher(
        groupService.endpoints.getAllGroups.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetMyGroupsResponse>) => {
          state.groups = action.payload.data.groups;
        },
      );
  },
});

export const useGroups = () => useSelector((state:RootState) => state.groups.groups ?? []);
// eslint-disable-next-line max-len
export const useMyGroups = () => useSelector((state:RootState) => state.groups.groups.filter((g:GroupType) => g.id === state.auth.user.id));
export const useJoinedGroups = () => useSelector((state:RootState) => state.groups.joined);

export default groupReducer;
