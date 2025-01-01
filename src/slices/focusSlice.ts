import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Focus } from "../../types/type";

type State = {
    focusNotes: Focus[],
    editingFocus: Focus | null,
}

const initialState: State = {
     focusNotes: [],
     editingFocus: null
}

const focusSlice = createSlice({
    name: 'focus',
    initialState,
    reducers: {
        allFocusNotes(state, action: PayloadAction<Focus[]>){
            state.focusNotes = action.payload;
        },
        addFocusNotes(state, action: PayloadAction<Focus>){
            state.focusNotes.push(action.payload);
        },
        findFocus(state, action: PayloadAction<string>){
            const findFocusNote = state.focusNotes.find((focus) => focus._id === action.payload);
            if(findFocusNote){
                state.editingFocus = findFocusNote;
            }
        },
        deleteFocusState(state, action: PayloadAction<string>){
            const updatedFocus = state.focusNotes.filter((focus) => focus._id !== action.payload);
            state.focusNotes = updatedFocus;
        }
    }
});

export const {allFocusNotes, addFocusNotes, findFocus, deleteFocusState} = focusSlice.actions;
export default focusSlice.reducer;
