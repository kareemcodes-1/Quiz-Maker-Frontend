import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal } from "../../types/type";

type State = {
    goals: Goal[],
    openGoalModal: boolean;
    value: string;
    editingMode: boolean;
    editingGoal: null | Goal;

}

const initialState: State = {
    goals: [],
    openGoalModal: false,
    editingGoal: null,
    editingMode: false,
    value: 'present'
}

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        allGoals(state, action: PayloadAction<Goal[]>){
            state.goals = action.payload;
        },
        setOpenGoalModal(state, action: PayloadAction<boolean>){
            state.openGoalModal = action.payload;
        },
        editGoal(state, action: PayloadAction<Goal>){
                    state.editingMode = true;
                    state.editingGoal = action.payload;
                    state.openGoalModal = true;
        },
        setEditing(state){
            state.editingGoal = null;
            state.editingMode = false;
        },
        handleFilter(state, action: PayloadAction<string>){
                    state.value = action.payload;
                },
                completeAGoal(state, action: PayloadAction<Goal>){
                    const updatedGoal = state.goals.map((goal) => {
                        if(goal._id === action.payload._id){
                            return {
                                ...action.payload
                            }
                        }else{
                            return goal
                        }
                    });
        
                    state.goals = updatedGoal;
                },
        deleteGoals(state, action: PayloadAction<string>){
                    const updatedGoal = state.goals.filter((goal) => goal._id !== action.payload);
                    state.goals = updatedGoal;
                }
    }
});

export const {allGoals, setOpenGoalModal, handleFilter, completeAGoal, editGoal, deleteGoals, setEditing} = goalSlice.actions;
export default goalSlice.reducer;