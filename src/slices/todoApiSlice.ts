import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from '../../types/type'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/todos`}),
    endpoints: (builder) => ({
        fetchTodos: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                credentials: "include",
            })
        }),
        createTodo: builder.mutation({
            query: (data: Todo) => ({
                url: '/',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
                credentials: "include",
            })
        }),
        updateTodo: builder.mutation({
            query: ({ data, id }: { data: Todo; id: string }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
                credentials: "include",
            })
        }),
        deleteTodo: builder.mutation({
            query: (id: string) => ({
                url: `/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),

        completeTodo: builder.mutation({
            query: ({id, data}: {id: string, data: boolean}) => ({
                url: `/complete/todo/${id}`,
                method: "PUT",
                headers: {
                   'Content-Type' : 'application/json',
                },
                body: {completed: data},
                credentials: "include",
            })
        }),
    })
});

export const {useCreateTodoMutation, useFetchTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation, useCompleteTodoMutation} = todoApi;