import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Topic } from '../../types/type';

export const topicApi = createApi({
    reducerPath: 'topicApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/topics`}),
    endpoints: (builder) => ({
        createTopic: builder.mutation({
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
        getAllTopics: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                credentials: "include",
            })
        }),

        updateTopic: builder.mutation({
                    query: ({id, data}: {id: string, data: Topic}) => ({
                        url: `/edit/${id}`,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: data,
                        credentials: "include",
                    })
         }),

         deleteTopic: builder.mutation({
            query: (id: string) => ({
                url: `/delete/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),
    })
});

export const {useCreateTopicMutation, useGetAllTopicsQuery, useUpdateTopicMutation, useDeleteTopicMutation} = topicApi;