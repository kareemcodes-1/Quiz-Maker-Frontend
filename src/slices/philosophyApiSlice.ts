import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Philosophy} from "../../types/type";

export const philosophyApi = createApi({
    reducerPath: 'philosophyApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/philosophies`}),
    endpoints: (builder) => ({
        createPhilosophy: builder.mutation({
            query: (data: Philosophy) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: data,
                credentials: "include",
            })
        }),
        getAllPhilosophy: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                credentials: "include",
            })
        }),

        updatePhilosophy: builder.mutation({
            query: ({id, data}: {id: string, data: Philosophy}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
                credentials: "include",
            })
        }),

        deletePhilosophy: builder.mutation({
            query: (id: string) => ({
              url: `/delete/${id}`,
              method: "DELETE",
              credentials: "include",
            }),
          }),
    })
});

export const {useCreatePhilosophyMutation, useGetAllPhilosophyQuery, useUpdatePhilosophyMutation, useDeletePhilosophyMutation } = philosophyApi;