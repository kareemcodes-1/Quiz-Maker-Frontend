import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {FlashCard } from '../../types/type';

export const flashCardApi = createApi({
    reducerPath: 'flashCardApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/flashcards`}),
    endpoints: (builder) => ({
        createFlashCard: builder.mutation({
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
        getAllFlashCards: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                credentials: "include",
            })
        }),

        updateFlashCard: builder.mutation({
                    query: ({id, data}: {id: string, data: FlashCard}) => ({
                        url: `/edit/${id}`,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: data,
                        credentials: "include",
                    })
         }),

         deleteFlashCard: builder.mutation({
            query: (id: string) => ({
                url: `/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),
    })
});

export const {useCreateFlashCardMutation, useGetAllFlashCardsQuery, useUpdateFlashCardMutation, useDeleteFlashCardMutation} = flashCardApi;