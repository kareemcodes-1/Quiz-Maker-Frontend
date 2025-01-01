import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "../../types/type";

type State = {
    plans: Plan[],
    openPlanModal: boolean;
    editingPlan: Plan | null;
}

const initialState: State = {
    plans: [],
    openPlanModal: false,
    editingPlan: null
}

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        allPlans(state, action: PayloadAction<Plan[]>){
            state.plans = action.payload;
        },
        setOpenPlanModal(state, action: PayloadAction<boolean>){
            state.openPlanModal = action.payload;
        },
        findPlan(state, action: PayloadAction<string>){
            const findPlan = state.plans.find((plan) => plan._id === action.payload);
            if(findPlan){
                state.editingPlan = findPlan;
            }
        },
        deletePlans(state, action: PayloadAction<string>){
            const updatedPlan = state.plans.filter((plan) => plan._id !== action.payload);
            state.plans = updatedPlan;
        }
    }
});

export const {allPlans, setOpenPlanModal, findPlan, deletePlans} = planSlice.actions;
export default planSlice.reducer;