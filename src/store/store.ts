import { apiAuth } from "@/modules/auth/services/auth.services"
import authReducer from "@/modules/auth/slices/auth.slice"
import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/api.slice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
