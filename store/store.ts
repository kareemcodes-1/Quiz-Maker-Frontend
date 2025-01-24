import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../src/slices/todoSlice";
import projectReducer from "../src/slices/projectSlice";
import memoryReducer from "../src/slices/memorySlice";
import goalReducer from "../src/slices/goalSlice";
import planReducer from "../src/slices/planSlice";
import philosophyReducer from "../src/slices/philosophySlice";
import {todoApi} from "../src/slices/todoApiSlice";
import {goalApi} from "../src/slices/goalApiSlice";
import {planApi} from "../src/slices/planApiSlice";
import {projectApi} from "../src/slices/projectApiSlice";
import {memoryApi} from "../src/slices/memoryApiSlice";
import { philosophyApi } from '../src/slices/philosophyApiSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        project: projectReducer,
        memory: memoryReducer,
        goal: goalReducer,
        plan: planReducer,
        philosophy: philosophyReducer,
        [todoApi.reducerPath] : todoApi.reducer,
        [projectApi.reducerPath] : projectApi.reducer,
        [memoryApi.reducerPath] : memoryApi.reducer,
        [goalApi.reducerPath] : goalApi.reducer,
        [planApi.reducerPath] : planApi.reducer,
        [philosophyApi.reducerPath] : philosophyApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware, projectApi.middleware, memoryApi.middleware, goalApi.middleware, planApi.middleware, philosophyApi.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;