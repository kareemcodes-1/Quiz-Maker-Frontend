import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../src/slices/todoSlice";
import projectReducer from "../src/slices/projectSlice";
import focusReducer from "../src/slices/focusSlice";
import memoryReducer from "../src/slices/memorySlice";
import goalReducer from "../src/slices/goalSlice";
import planReducer from "../src/slices/planSlice";
import gratitudeReducer from "../src/slices/gratitudeSlice";
import learningReducer from "../src/slices/whatILearntSlice";
import {todoApi} from "../src/slices/todoApiSlice";
import {goalApi} from "../src/slices/goalApiSlice";
import {planApi} from "../src/slices/planApiSlice";
import {projectApi} from "../src/slices/projectApiSlice";
import {focusApi} from "../src/slices/focusApiSlice";
import {memoryApi} from "../src/slices/memoryApiSlice";
import {gratitudeApi} from "../src/slices/gratitudeApiSlice";
import {learningApi} from "../src/slices/whatILearntApiSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        project: projectReducer,
        focus: focusReducer,
        memory: memoryReducer,
        goal: goalReducer,
        plan: planReducer,
        learning: learningReducer,
        gratitude: gratitudeReducer,
        [todoApi.reducerPath] : todoApi.reducer,
        [projectApi.reducerPath] : projectApi.reducer,
        [focusApi.reducerPath] : focusApi.reducer,
        [memoryApi.reducerPath] : memoryApi.reducer,
        [goalApi.reducerPath] : goalApi.reducer,
        [planApi.reducerPath] : planApi.reducer,
        [gratitudeApi.reducerPath] : gratitudeApi.reducer,
        [learningApi.reducerPath] : learningApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware, projectApi.middleware, focusApi.middleware, memoryApi.middleware, goalApi.middleware, planApi.middleware, gratitudeApi.middleware, learningApi.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;