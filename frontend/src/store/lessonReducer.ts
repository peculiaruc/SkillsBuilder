import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { GetLessonResponse } from '../interfaces/LessonType';
import { MediaType } from '../interfaces/MediaType';
import { RootState } from '.';
import lessonService from '../apiServices/lessonService';

interface InitialStateType {
  contents: MediaType[];
}

const lessonReducer = createSlice({
  name: 'lesson',
  initialState: {
    contents: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      lessonService.endpoints.getLessonContent.matchFulfilled,
      (state: InitialStateType, action: PayloadAction<GetLessonResponse>) => {
        state.contents = action.payload.data.lesson.contents as MediaType[];
      },
    );
  },
});

export const useContents = () => useSelector((state:RootState) => state.lesson.contents ?? []);
// export const useDialogForm = () => useDispatch()(openDialog(payload));
export default lessonReducer;
