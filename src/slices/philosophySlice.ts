import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Philosophy } from "../../types/type";

type State = {
  philosophies: Philosophy[];
  editingPhilosophy: Philosophy | null;
};

const initialState: State = {
  philosophies: [],
  editingPhilosophy: null,
};

const philosophySlice = createSlice({
  name: "philosophy",
  initialState,
  reducers: {
    allPhilosophy(state, action: PayloadAction<Philosophy[]>) {
      state.philosophies = action.payload;
    },
    addPhilosophy(state, action: PayloadAction<Philosophy>) {
      state.philosophies.push(action.payload);
    },
    findPhilosophy(state, action: PayloadAction<string>) {
      const findPhilosophy = state.philosophies.find(
        (philosophy) => philosophy._id === action.payload
      );
      if (findPhilosophy) {
        state.editingPhilosophy = findPhilosophy;
      }
    },
    updatePhilosophy(state, action: PayloadAction<Philosophy>) {
      const updatedPhilosophy = state.philosophies.map((philosophy) => {
        if (philosophy._id === action.payload._id) {
          return {
            ...action.payload,
          };
        } else {
          return philosophy;
        }
      });

      state.philosophies = updatedPhilosophy;
    },
    deletePhilosophy(state, action: PayloadAction<string>) {
      const updatedPhilosophy = state.philosophies.filter(
        (philosophy) => philosophy._id !== action.payload
      );
      state.philosophies= updatedPhilosophy;
    },

  },
});

export const { allPhilosophy, addPhilosophy, findPhilosophy, deletePhilosophy,  updatePhilosophy} =
  philosophySlice.actions;
export default philosophySlice.reducer;