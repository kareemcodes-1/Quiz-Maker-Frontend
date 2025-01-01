import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/type";

type State = {
    todos: Todo[],
    editingTodo: null | Todo;
    editingMode: boolean;
    openTodoModal: boolean;
    value: string;
    filteredTodos: Todo[];
}

const initialState: State = {
    todos: [],
    filteredTodos: [],
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
            state.filteredTodos = action.payload;
        },
        addTodo(state, action: PayloadAction<Todo>){
            state.todos.push(action.payload);
            state.filteredTodos.push(action.payload)
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
        handleTodosFilter(state, action: PayloadAction<string>){
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            state.filteredTodos = state.todos.filter((todo) => {
                if(todo.date){
                    const todoDate = new Date(todo.date);
                    if(action.payload === 'today'){
                        return todoDate.toDateString() === today.toDateString();
                    }else if(action.payload === 'tomorrow'){
                        return todoDate.toDateString() === tomorrow.toDateString();
                    }else if(action.payload === 'all'){
                        return true;
                    }
                }
            });
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

export const {addTodo, allTodos, editTodo, setOpenTodoModal, updateTodos, deleteTodos, handleFilter, completeATodo, setEditing, handleTodosFilter} = todoSlice.actions;
export default todoSlice.reducer;
