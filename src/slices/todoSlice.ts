import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/type";

type State = {
    todos: Todo[],
    editingTodo: null | Todo;
    editingMode: boolean;
    openTodoModal: boolean;
    value: string;
}

const initialState: State = {
    todos: [],
    editingTodo: null,
    editingMode: false,
    value: 'morning',
    openTodoModal: false
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        allTodos(state, action: PayloadAction<Todo[]>){
            state.todos = action.payload;
        },
        addTodo(state, action: PayloadAction<Todo>){
            state.todos.push(action.payload);
        },
        editTodo(state, action: PayloadAction<Todo>){
            state.editingMode = true;
            state.editingTodo = action.payload;
            state.openTodoModal = true;
        },
        setOpenTodoModal(state, action: PayloadAction<boolean>){
            state.openTodoModal = action.payload;
        },
        setEditing(state){
            state.editingTodo = null;
            state.editingMode = false;
        },
        updateTodos(state, action: PayloadAction<Todo>){
            const updatedTodo = state.todos.map((todo) => {
                if(todo._id === action.payload._id){
                    return {
                        ...action.payload
                    }
                }else{
                    return todo;
                }
            });
            state.todos = updatedTodo;
        },
        deleteTodos(state, action: PayloadAction<string>){
            const updatedTodo = state.todos.filter((todo) => todo._id !== action.payload);
            state.todos = updatedTodo;
        },
        handleFilter(state, action: PayloadAction<string>){
            state.value = action.payload;
        },
        completeATodo(state, action: PayloadAction<Todo>){
            const updatedTodo = state.todos.map((todo) => {
                if(todo._id === action.payload._id){
                    return {
                        ...action.payload
                    }
                }else{
                    return todo
                }
            });

            state.todos = updatedTodo;
        }
    }
});

export const {addTodo, allTodos, editTodo, setOpenTodoModal, updateTodos, deleteTodos, handleFilter, completeATodo, setEditing} = todoSlice.actions;
export default todoSlice.reducer;
