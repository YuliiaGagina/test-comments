import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../types/Icomment";
import { addComment, deleteComment, getComments } from "./ActionCreaters";

interface CommentState {
  comments: IComment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: "",
};

export const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.isLoading = false;
          state.comments = [...action.payload].reverse();
        }
      )
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error Loading";
      })

      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          const { id } = action.payload;
          state.comments = state.comments.filter((item) => item.id !== id);
          state.isLoading = false;
        }
      )
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = "Error Loading";
        state.isLoading = false;
      })

      .addCase(addComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.comments = [payload, ...state.comments];
        state.isLoading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = "Error Loading";
        state.isLoading = false;
      });
  },
});
export const { resetError } = commentSlice.actions;
export default commentSlice.reducer;
