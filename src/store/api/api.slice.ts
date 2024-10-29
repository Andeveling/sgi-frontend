
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../types"

export const baseUrl = "http://localhost:3001"

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})


export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
})
