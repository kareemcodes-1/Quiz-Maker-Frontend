import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types/type";

type State = {
    projects: Project[],
    openProjectModal: boolean;
}

const initialState: State = {
    projects: [],
    openProjectModal: false
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject(state, action:PayloadAction<Project>){
            state.projects.push(action.payload);
        },
        allProjects(state, action: PayloadAction<Project[]>){
            state.projects = action.payload;
        },
        setOpenProjectModal(state, action: PayloadAction<boolean>){
            console.log(action.payload);
            state.openProjectModal = action.payload;
        }
    }
});

export const {allProjects, setOpenProjectModal, addProject} = projectSlice.actions;
export default projectSlice.reducer;
