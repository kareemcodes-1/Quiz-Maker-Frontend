import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WIL } from "../../types/type";

type State = {
  learnings: WIL[];
  editingLearning: WIL | null;
};

const initialState: State = {
  learnings: [],
  editingLearning: null,
};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    allLearnings(state, action: PayloadAction<WIL[]>) {
      state.learnings = action.payload;
    },
    addLearning(state, action: PayloadAction<WIL>) {
      state.learnings.push(action.payload);
    },
    findLearning(state, action: PayloadAction<string>) {
      const findLearning = state.learnings.find(
        (learning) => learning._id === action.payload
      );
      if (findLearning) {
        state.editingLearning = findLearning;
      }
    },
    updateLearning(state, action: PayloadAction<WIL>) {
      const updatedLearning = state.learnings.map((learning) => {
        if (learning._id === action.payload._id) {
          return {
            ...action.payload,
          };
        } else {
          return learning;
        }
      });

      state.learnings = updatedLearning;
    },
    deleteLearning(state, action: PayloadAction<string>) {
      const updatedLearning = state.learnings.filter(
        (learning) => learning._id !== action.payload
      );
      state.learnings = updatedLearning;
    },

  },
});

export const { allLearnings, addLearning, findLearning, deleteLearning,  updateLearning} =
  learningSlice.actions;
export default learningSlice.reducer;