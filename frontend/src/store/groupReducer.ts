import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { GroupId, GroupType } from '../interfaces/GroupTypes';

type InitialStateType = {
  joined: GroupId[],
  groups: GroupType[],
};

type ReducerState = {
  groups: InitialStateType
};

const nanoid = () => Math.floor(Math.random() * 1000000000000000000);
const groupReducer = createSlice({
  name: 'groups',
  initialState: {
    joined: [],
    groups: [
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn React',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn NodeJS',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn GraphQL',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn Google Cloud',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn AWS',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn Java',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn Android',
      },
      {
        id: nanoid(),
        owner: nanoid(),
        name: 'Learn Python',
      },
    ],
  },
  reducers: {
    addGroup: (state:InitialStateType, action: PayloadAction<GroupType>) => {
      state.groups.push(action.payload);
    },
    joinGroup: (state:InitialStateType, action: PayloadAction<GroupId>) => {
      const group = state.groups.find((g) => g.id === action.payload);
      if (group) { state.joined.push(group.id); }
    },
    leaveGroup: (state:InitialStateType, action: PayloadAction<GroupId>) => {
      state.joined = state.joined.filter((id) => id !== action.payload);
    },
    deleteGroup: (state:InitialStateType, action: PayloadAction<GroupId>) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
  },
});

export const useGroups = () => useSelector((state:ReducerState) => state.groups.groups ?? []);
export const useJoinedGroups = () => useSelector((state:ReducerState) => state.groups.joined ?? []);
export const {
  addGroup, deleteGroup, leaveGroup, joinGroup,
} = groupReducer.actions;
export default groupReducer;
