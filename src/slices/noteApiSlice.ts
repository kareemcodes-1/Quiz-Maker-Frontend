import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Note } from '../../types/type';

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/notes`}),
    endpoints: (builder) => ({
        createNote: builder.mutation({
            query: (data) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
                credentials: "include",
            })
        }),
        getAllNotes: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                credentials: "include",
            })
        }),

        updateNote: builder.mutation({
                    query: ({id, data}: {id: string, data: Note}) => ({
                        url: `/edit/${id}`,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: data,
                        credentials: "include",
                    })
         }),

         deleteNote: builder.mutation({
            query: (id: string) => ({
                url: `/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),
    })
});

export const {useCreateNoteMutation, useGetAllNotesQuery, useUpdateNoteMutation, useDeleteNoteMutation} = noteApi;