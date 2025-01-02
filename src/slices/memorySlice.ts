import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Memory } from "../../types/type";

type State = {
    memories: Memory[],
    openMemoryModal: boolean;
    editingMemory: Memory | null;
    editingMode: boolean;
}

const initialState: State = {
    memories: [],
    openMemoryModal: false,
    editingMemory: null,
    editingMode: false
}

const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers: {
        addMemory(state, action: PayloadAction<Memory>){
                    state.memories.push(action.payload);
        },
        allMemories(state, action: PayloadAction<Memory[]>){
            state.memories = action.payload;
        },
        setOpenMemoryModal(state, action: PayloadAction<boolean>){
            state.openMemoryModal = action.payload;
        },
        setEditing(state){
            state.editingMemory = null;
            state.editingMode = false;
        },
        editMemory(state, action: PayloadAction<Memory>){
            state.editingMode = true;
            state.editingMemory = action.payload;
            state.openMemoryModal = true;
        },
        updateMemories(state, action: PayloadAction<Memory>){
                    const updatedMemory = state.memories.map((memory) => {
                        if(memory._id === action.payload._id){
                            return {
                                ...action.payload
                            }
                        }else{
                            return memory;
                        }
                    });
                    state.memories = updatedMemory;
        },
        deleteMemories(state, action: PayloadAction<string>){
            const updatedMemory = state.memories.filter((memory) => memory._id !== action.payload);
            state.memories = updatedMemory;
        }
    }
});

export const {allMemories, setOpenMemoryModal, addMemory, deleteMemories, updateMemories, editMemory, setEditing} = memorySlice.actions;
export default memorySlice.reducer;
