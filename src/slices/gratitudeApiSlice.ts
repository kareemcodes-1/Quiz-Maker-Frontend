import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Gratitude} from "../../types/type";

export const gratitudeApi = createApi({
    reducerPath: 'gratitudeApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/gratitudes`}),
    endpoints: (builder) => ({
        createGratitude: builder.mutation({
            query: (data: Gratitude) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: data
            })
        }),
        getAllGratitude: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
            })
        }),

        updateGratitude: builder.mutation({
            query: ({id, data}: {id: string, data: Gratitude}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data
            })
        }),

        deleteGratitude: builder.mutation({
            query: (id: string) => ({
              url: `/delete/${id}`,
              method: "DELETE",
            }),
          }),
    })
});

export const {useCreateGratitudeMutation, useGetAllGratitudeQuery, useUpdateGratitudeMutation, useDeleteGratitudeMutation } = gratitudeApi;