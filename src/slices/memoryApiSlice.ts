import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const memoryApi = createApi({
    reducerPath: 'memoryApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api/memories"}),
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
        })
    })
});

export const {useCreateMemoryMutation, useGetAllMemoriesQuery} = memoryApi;