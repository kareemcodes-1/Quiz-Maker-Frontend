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
        updatePlans(state, action: PayloadAction<Plan>) {
              const updatedPlan = state.plans.map((plan) => {
                if (plan._id === action.payload._id) {
                  return {
                    ...action.payload,
                  };
                } else {
                  return plan;
                }
              });
        
              state.plans = updatedPlan;
            },
        deletePlans(state, action: PayloadAction<string>){
            const updatedPlan = state.plans.filter((plan) => plan._id !== action.payload);
            state.plans = updatedPlan;
        }
    }
});

export const {allPlans, setOpenPlanModal, findPlan, deletePlans, updatePlans} = planSlice.actions;
export default planSlice.reducer;