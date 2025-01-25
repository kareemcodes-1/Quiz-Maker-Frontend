import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/type";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/users`}),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            })
        }),
        registerUser: builder.mutation({
            query: (data: User) => ({
                url: '/auth/register',
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data: User) => ({
                url: '/auth/login',
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: data,
                // credentials: "include"
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: "POST",
            })
        }),
    })
});

export const {useLoginUserMutation, useRegisterUserMutation, useGetAllUsersQuery, useLogoutUserMutation} = authApi;
