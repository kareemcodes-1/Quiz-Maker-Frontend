import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/projects`}),
    endpoints: (builder) => ({
        createProject: builder.mutation({
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
        getAllProjects: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                // credentials: "include",
            })
        })
    })
});

export const {useCreateProjectMutation, useGetAllProjectsQuery} = projectApi;