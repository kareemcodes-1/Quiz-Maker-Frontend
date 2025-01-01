import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Goal } from "../../types/type";

export const goalApi = createApi({
  reducerPath: "goalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/goals" }),
  endpoints: (builder) => ({
    createGoal: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getAllGoals: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
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
      }),
    }),
    deleteGoal: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "DELETE",
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
