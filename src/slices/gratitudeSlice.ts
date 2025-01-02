import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gratitude } from "../../types/type";

type State = {
  gratitudes: Gratitude[];
  editingGratitude: Gratitude | null;
};

const initialState: State = {
  gratitudes: [],
  editingGratitude: null,
};

const gratitudeSlice = createSlice({
  name: "gratitude",
  initialState,
  reducers: {
    allGratitude(state, action: PayloadAction<Gratitude[]>) {
      state.gratitudes = action.payload;
    },
    addGratitude(state, action: PayloadAction<Gratitude>) {
      state.gratitudes.push(action.payload);
    },
    findGratitude(state, action: PayloadAction<string>) {
      const findGratitude = state.gratitudes.find(
        (gratitude) => gratitude._id === action.payload
      );
      if (findGratitude) {
        state.editingGratitude = findGratitude;
      }
    },
    updateGratitude(state, action: PayloadAction<Gratitude>) {
      const updatedGratitude = state.gratitudes.map((gratitude) => {
        if (gratitude._id === action.payload._id) {
          return {
            ...action.payload,
          };
        } else {
          return gratitude;
        }
      });

      state.gratitudes = updatedGratitude;
    },
    deleteGratitude(state, action: PayloadAction<string>) {
      const updatedGratitude = state.gratitudes.filter(
        (gratitude) => gratitude._id !== action.payload
      );
      state.gratitudes = updatedGratitude;
    },

  },
});

export const { allGratitude, addGratitude, findGratitude, deleteGratitude,  updateGratitude} =
  gratitudeSlice.actions;
export default gratitudeSlice.reducer;