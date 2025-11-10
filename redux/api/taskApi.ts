import { baseApi } from "./baseApi";

export const TASKS_URL = "/task"; 

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create-task`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:['Task']
    }),
    getSingleTask: builder.query({
      query: (id) => ({
        url: `${TASKS_URL}/get-task/${id}`,
        method: "GET",
      }),
        providesTags:["Task"]
    }),

    getAllTasks: builder.query({
      query: () => ({
        url: `${TASKS_URL}/get-all-task`,
        method: "GET",
      }),
      providesTags:["Task"]
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/delete-task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['Task'],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetSingleTaskQuery,
  useGetAllTasksQuery,
  useDeleteTaskMutation,
} = taskApi;