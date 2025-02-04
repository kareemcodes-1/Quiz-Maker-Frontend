import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/type";

type State = {
    notes: Note[],
    filteredNotes: Note[],
    openNoteModal: boolean;
    editingNote: Note | null;
    value: string;
}

const initialState: State = {
    notes: [],
    filteredNotes: [],
    openNoteModal: false,
    editingNote: null,
    value: 'all',
}

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        allNotes(state, action: PayloadAction<Note[]>){
            state.notes = action.payload;
            state.filteredNotes = action.payload;
        },
        setOpenNoteModal(state, action: PayloadAction<boolean>){
            state.openNoteModal = action.payload;
        },
        findNote(state, action: PayloadAction<string>){
            const findNote = state.notes.find((note) => note._id === action.payload);
            if(findNote){
                state.editingNote = findNote;
            }
        },
        handleNotesFilter(state, action: PayloadAction<string>){
            state.value = action.payload;
            const updatedNotes = state.filteredNotes.filter((note) => {
               if(state.value === 'all'){
                  return note;
               }else if(state.value === action.payload.toLowerCase()){
                   return note.projectId.name.toLowerCase() === state.value.toLowerCase();
               }
            });
      
            state.notes = updatedNotes;
          },
        updateNotes(state, action: PayloadAction<Note>) {
              const updatedNote = state.notes.map((note) => {
                if (note._id === action.payload._id) {
                  return {
                    ...action.payload,
                  };
                } else {
                  return note;
                }
              });
        
              state.notes = updatedNote;
            },
        deleteNotes(state, action: PayloadAction<string>){
            const updatedNote = state.notes.filter((note) => note._id !== action.payload);
            state.notes = updatedNote;
        }
    }
});

export const {allNotes, setOpenNoteModal, findNote, deleteNotes, updateNotes, handleNotesFilter} = noteSlice.actions;
export default noteSlice.reducer;