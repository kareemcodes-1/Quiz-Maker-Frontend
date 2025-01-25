import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Goal } from "../../types/type";

export const goalApi = createApi({
  reducerPath: "goalApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/goals` }),
  endpoints: (builder) => ({
    createGoal: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        credentials: "include",
      }),
    }),
    getAllGoals: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),

    updateGoal: builder.mutation({
      query: ({ data, id }: { data: Goal; id: string }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        credentials: "include",
      }),
    }),
    deleteGoal: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    completeGoal: builder.mutation({
      query: ({ id, data }: { id: string; data: Goal }) => ({
        url: `/complete/goal/${id}`,
        method: "PUT",
        headers: {
          "Comtent-Type": "application/json",
        },
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateGoalMutation,
  useGetAllGoalsQuery,
  useCompleteGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} = goalApi;
