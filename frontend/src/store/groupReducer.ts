import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '.';
import groupService from '../apiServices/groupService';
import { GetMyGroupsResponse, GroupType } from '../interfaces/GroupTypes';

type InitialStateType = {
  groups: GroupType[],
};

const nanoid = () => Math.floor(Math.random() * 1000000000000000000);
const groupReducer = createSlice({
  name: 'groups',
  initialState: {
    groups: [
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn React',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn NodeJS',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn GraphQL',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn Google Cloud',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn AWS',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn Java',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn Android',
      },
      {
        id: nanoid(),
        owner_id: nanoid(),
        name: 'Learn Python',
      },
    ],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        groupService.endpoints.getMyGroups.matchFulfilled,
        (state: InitialStateType, action: PayloadAction<GetMyGroupsResponse>) => {
          state.groups = action.payload.data.groups;
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
export const useJoinedGroups = () => useSelector((state:RootState) => state.groups.groups.filter((g) => g.id === state.auth.user.id));

export default groupReducer;
