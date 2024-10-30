import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "@/store/types"
import { LoginRequest, UserResponse } from "../types/auth.interfaces"

export const apiAuth = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/auth/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.jwt
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "local",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
})

export const { useLoginMutation, useProtectedMutation } = apiAuth
