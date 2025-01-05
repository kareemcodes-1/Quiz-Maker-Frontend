import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "../../types/type";

type State = {
    plans: Plan[],
    filteredPlans: Plan[],
    openPlanModal: boolean;
    editingPlan: Plan | null;
    value: string;
}

const initialState: State = {
    plans: [],
    filteredPlans: [],
    openPlanModal: false,
    editingPlan: null,
    value: 'all',
}

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        allPlans(state, action: PayloadAction<Plan[]>){
            state.plans = action.payload;
            state.filteredPlans = action.payload;
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
        handlePlansFilter(state, action: PayloadAction<string>){
            state.value = action.payload;
            const updatedPlans = state.filteredPlans.filter((plan) => {
               if(state.value === 'all'){
                  return plan;
               }else if(state.value === action.payload.toLowerCase()){
                   return plan.projectId.name.toLowerCase() === state.value.toLowerCase();
               }
            });
      
            state.plans = updatedPlans;
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

export const {allPlans, setOpenPlanModal, findPlan, deletePlans, updatePlans, handlePlansFilter} = planSlice.actions;
export default planSlice.reducer;