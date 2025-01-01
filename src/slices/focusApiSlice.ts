import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Focus} from "../../types/type";

export const focusApi = createApi({
    reducerPath: 'focusApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/focus'}),
    endpoints: (builder) => ({
        createFocus: builder.mutation({
            query: (data: Focus) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: data
            })
        }),
        getAllFocus: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
            })
        }),

        updateFocus: builder.mutation({
            query: ({id, data}: {id: string, data: Focus}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data
            })
        }),

        deleteFocus: builder.mutation({
            query: (id: string) => ({
              url: `/delete/${id}`,
              method: "DELETE",
            }),
          }),
    })
});

export const {useCreateFocusMutation, useGetAllFocusQuery, useUpdateFocusMutation, useDeleteFocusMutation } = focusApi;