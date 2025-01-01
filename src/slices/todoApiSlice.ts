import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from '../../types/type'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/todos'}),
    endpoints: (builder) => ({
        fetchTodos: builder.query({
            query: () => ({
                url: '/',
                method: "GET"
            })
        }),
        createTodo: builder.mutation({
            query: (data: Todo) => ({
                url: '/',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        }),
        updateTodo: builder.mutation({
            query: ({ data, id }: { data: Todo; id: string }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        }),
        deleteTodo: builder.mutation({
            query: (id: string) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            })
        }),

        completeTodo: builder.mutation({
            query: ({id, data}: {id: string, data: Todo}) => ({
                url: `/complete/todo/${id}`,
                method: "PUT",
                headers: {
                   'Comtent-Type' : 'application/json',
                },
                body: data,
            })
        }),
    })
});

export const {useCreateTodoMutation, useFetchTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation, useCompleteTodoMutation} = todoApi;