import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../src/slices/todoSlice";
import projectReducer from "../src/slices/projectSlice";
import memoryReducer from "../src/slices/memorySlice";
import authReducer from "../src/slices/authSlice";
import goalReducer from "../src/slices/goalSlice";
import flashCardReducer from "../src/slices/flashCardSlice";
import noteReducer from "../src/slices/noteSlice";
import philosophyReducer from "../src/slices/philosophySlice";
import {todoApi} from "../src/slices/todoApiSlice";
import {goalApi} from "../src/slices/goalApiSlice";
import {noteApi} from "../src/slices/noteApiSlice";
import {flashCardApi} from "../src/slices/flashCardApiSlice";
import {authApi} from "../src/slices/authApiSlice";
import {projectApi} from "../src/slices/projectApiSlice";
import {memoryApi} from "../src/slices/memoryApiSlice";
import { philosophyApi } from '../src/slices/philosophyApiSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer,
        project: projectReducer,
        memory: memoryReducer,
        goal: goalReducer,
        note: noteReducer,
        flashcard: flashCardReducer,
        philosophy: philosophyReducer,
        [todoApi.reducerPath] : todoApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [projectApi.reducerPath] : projectApi.reducer,
        [memoryApi.reducerPath] : memoryApi.reducer,
        [goalApi.reducerPath] : goalApi.reducer,
        [noteApi.reducerPath] : noteApi.reducer,
        [flashCardApi.reducerPath]: flashCardApi.reducer,
        [philosophyApi.reducerPath] : philosophyApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware, authApi.middleware, projectApi.middleware, memoryApi.middleware, goalApi.middleware, noteApi.middleware, philosophyApi.middleware, flashCardApi.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;