import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '.';
import groupService from '../apiServices/groupService';
import userService from '../apiServices/userService';
import {
  GetAllGroupsResponse,
  GetMyGroupsResponse,
  GroupType, JoinGroupType,
  GetGroupbyIdResponse,
} from '../interfaces/GroupTypes';

type InitialStateType = {
  groups: GroupType[],
  joined: JoinGroupType[],
  group: GroupType,
};
const initialState = {
  groups: [],
  joined: [],
  group: {},
} as unknown as InitialStateType;
const groupReducer = createSlice({
  name: 'groups',
  initialState,
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
        (state: InitialStateType, action: PayloadAction<GetAllGroupsResponse>) => {
          state.groups = action.payload.data.groups;
        },
      )
      .addMatcher(
        groupService.endpoints.getGroupById.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetGroupbyIdResponse>) => {
          state.group = action.payload.data.groups;
        },
      );
  },
});

export const useGroups = () => useSelector((state:RootState) => state.groups.groups ?? []);
// eslint-disable-next-line max-len
export const useMyGroups = () => useSelector(
  (state:RootState) => state.groups.joined.filter(
    (g:JoinGroupType) => g.owner_id === state.auth.user.id,
  ),
);
export const useJoinedGroups = () => useSelector(
  (state:RootState) => state.groups.joined.map(
    (g: JoinGroupType) => g.group_id,
  ),
);

export const useGroup = () => useSelector(
  (state:RootState) => state.groups.group,
);

export default groupReducer;
