import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Plan } from '../../types/type';

export const planApi = createApi({
    reducerPath: 'planApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/plans`}),
    endpoints: (builder) => ({
        createPlan: builder.mutation({
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
        getAllPlans: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                credentials: "include",
            })
        }),

        updatePlan: builder.mutation({
                    query: ({id, data}: {id: string, data: Plan}) => ({
                        url: `/edit/${id}`,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: data,
                        credentials: "include",
                    })
         }),

         deletePlan: builder.mutation({
            query: (id: string) => ({
                url: `/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),
    })
});

export const {useCreatePlanMutation, useGetAllPlansQuery, useUpdatePlanMutation, useDeletePlanMutation} = planApi;