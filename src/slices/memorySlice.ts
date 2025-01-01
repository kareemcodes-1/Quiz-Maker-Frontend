import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Memory } from "../../types/type";

type State = {
    memories: Memory[],
    openMemoryModal: boolean;
}

const initialState: State = {
    memories: [],
    openMemoryModal: false
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
        }
    }
});

export const {allMemories, setOpenMemoryModal, addMemory} = memorySlice.actions;
export default memorySlice.reducer;
