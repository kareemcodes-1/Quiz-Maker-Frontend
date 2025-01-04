import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WIL } from "../../types/type";

type State = {
  learnings: WIL[];
  editingLearning: WIL | null;
  value: string;
  filteredLearnings: WIL[];
};


const initialState: State = {
  learnings: [],
  editingLearning: null,
  value: 'all',
  filteredLearnings: [],

};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    allLearnings(state, action: PayloadAction<WIL[]>) {
      state.learnings = action.payload;
      state.filteredLearnings = action.payload;
    },
    addLearning(state, action: PayloadAction<WIL>) {
      state.learnings.push(action.payload);
      state.filteredLearnings.push(action.payload);
    },
    findLearning(state, action: PayloadAction<string>) {
      const findLearning = state.learnings.find(
        (learning) => learning._id === action.payload
      );
      if (findLearning) {
        state.editingLearning = findLearning;
      }
    },
    handleLearningFilter(state, action: PayloadAction<string>){
      state.value = action.payload;
      const updatedLearning = state.filteredLearnings.filter((learning) => {
         if(state.value === 'all'){
            return learning;
         }else if(state.value === action.payload.toLowerCase()){
             return learning.projectId.name.toLowerCase() === state.value.toLowerCase();
         }
      });

      state.learnings = updatedLearning;
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
      state.filteredLearnings = updatedLearning;
    },
    deleteLearning(state, action: PayloadAction<string>) {
      const updatedLearning = state.learnings.filter(
        (learning) => learning._id !== action.payload
      );
      state.learnings = updatedLearning;
      state.filteredLearnings = updatedLearning;
    },

  },
});

export const { allLearnings, addLearning, findLearning, deleteLearning,  updateLearning, handleLearningFilter} =
  learningSlice.actions;
export default learningSlice.reducer;