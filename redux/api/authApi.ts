import { baseApi } from "./baseApi";
export const USERS_URL = "/user";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],

    }),
    activatateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/activate-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],

    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/update-profile`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],

    }),
    getMe: builder.query({
      query: () => ({
        url: `${USERS_URL}/my-profile`,
        method: "GET",
      }),
      providesTags: ["User"],

    }),

  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useActivatateUserMutation, useUpdateUserMutation, useGetMeQuery } = authApi;