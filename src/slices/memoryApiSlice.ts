import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Memory } from '../../types/type';

export const memoryApi = createApi({
    reducerPath: 'memoryApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/memories`}),
    endpoints: (builder) => ({
        createMemory: builder.mutation({
            query: (data) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
        }),
        getAllMemories: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
            })
        }),

         updateMemory: builder.mutation({
            query: ({ data, id }: { data: Memory; id: string }) => ({
              url: `/edit/${id}`,
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: data,
            }),
          }),

          deleteMemory: builder.mutation({
            query: (id: string) => ({
              url: `/delete/${id}`,
              method: "DELETE",
            }),
          }),
    })
});

export const {useCreateMemoryMutation, useGetAllMemoriesQuery, useDeleteMemoryMutation, useUpdateMemoryMutation} = memoryApi;