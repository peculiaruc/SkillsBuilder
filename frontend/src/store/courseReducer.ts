import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import courseService from '../apiServices/courseService';
import userService from '../apiServices/userService';
import {
  CourseType,
  EnrolledCourseType,
  GetAllCoursesResponse,
  GetMyCoursesResponse,
} from '../interfaces/CourseType';

type InitialStateType = {
  enrolled:EnrolledCourseType[],
  courses:CourseType[]
};

type ReducerState = {
  courses: InitialStateType
};

const courseReducer = createSlice({
  name: 'courses',
  initialState: {
    enrolled: [],
    courses: [],
  },
  reducers: {
    addCourse: (state:InitialStateType, { payload }:{ payload:CourseType }) => {
      const currentState = state;
      currentState.courses.push(payload);
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        courseService.endpoints.getAllCourses.matchFulfilled,
        (state: InitialStateType, { payload }: { payload: GetAllCoursesResponse }) => {
          const currenState = state;
          currenState.courses = payload.data.courses;
        },
      ).addMatcher(
        userService.endpoints.getUserCourses.matchFulfilled,
        (state: InitialStateType, { payload }: { payload: GetMyCoursesResponse }) => {
          const currenState = state;
          currenState.enrolled = payload.data.courses;
        },
      );
  },
});

export const useCourses = () => useSelector((state:ReducerState) => state.courses.courses);
export const useEnrolledCourses = () => useSelector((state:ReducerState) => state.courses.enrolled);
export const { addCourse } = courseReducer.actions;
export default courseReducer;
