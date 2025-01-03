import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Focus } from "../../types/type";

type State = {
  focusNotes: Focus[];
  editingFocus: Focus | null;
  filteredFocus: Focus[];
};

const initialState: State = {
  focusNotes: [],
  editingFocus: null,
  filteredFocus: [],
};

const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    allFocusNotes(state, action: PayloadAction<Focus[]>) {
      state.focusNotes = action.payload;
      state.filteredFocus = action.payload;
    },
    addFocusNotes(state, action: PayloadAction<Focus>) {
      state.focusNotes.push(action.payload);
      state.filteredFocus.push(action.payload);
    },
    findFocus(state, action: PayloadAction<string>) {
      const findFocusNote = state.focusNotes.find(
        (focus) => focus._id === action.payload
      );
      if (findFocusNote) {
        state.editingFocus = findFocusNote;
      }
    },
    updatedFocusNote(state, action: PayloadAction<Focus>) {
      const updatedFocus = state.focusNotes.map((focus) => {
        if (focus._id === action.payload._id) {
          return {
            ...action.payload,
          };
        } else {
          return focus;
        }
      });

      state.focusNotes = updatedFocus;
      state.filteredFocus = updatedFocus;
    },
    deleteFocusState(state, action: PayloadAction<string>) {
      const updatedFocus = state.focusNotes.filter(
        (focus) => focus._id !== action.payload
      );
      state.focusNotes = updatedFocus;
      state.filteredFocus = updatedFocus;
    },

    handleFocusFilter(state, action: PayloadAction<string>){
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      state.filteredFocus = state.focusNotes.filter((focus) => {
          if(focus.date){
              const todoDate = new Date(focus.date);
              if(action.payload === 'today'){
                  return todoDate.toDateString() === today.toDateString();
              }else if(action.payload === 'tomorrow'){
                  return todoDate.toDateString() === tomorrow.toDateString();
              }else if(action.payload === 'all'){
                  return true;
              }
          }
      });
  },
  },
});

export const { allFocusNotes, addFocusNotes, findFocus, deleteFocusState,  updatedFocusNote, handleFocusFilter } =
  focusSlice.actions;
export default focusSlice.reducer;
