import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {WIL} from "../../types/type";

export const learningApi = createApi({
    reducerPath: 'learningApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/learnings`}),
    endpoints: (builder) => ({
        createLearning: builder.mutation({
            query: (data: WIL) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: data
            })
        }),
        getAllLearning: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
            })
        }),

        updateLearning: builder.mutation({
            query: ({id, data}: {id: string, data: WIL}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data
            })
        }),

        deleteLearning: builder.mutation({
            query: (id: string) => ({
              url: `/delete/${id}`,
              method: "DELETE",
            }),
          }),
    })
});

export const {useCreateLearningMutation, useGetAllLearningQuery, useUpdateLearningMutation, useDeleteLearningMutation } = learningApi;