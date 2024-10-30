import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/store/types"
import type { User } from "../types/auth.interfaces"

type AuthState = {
  jwt: string | null
  user: User | null
}

const slice = createSlice({
  name: "auth",
  initialState: { user: null, jwt: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user, jwt } }: PayloadAction<{ user: User; jwt: string }>) => {
      state.user = user
      state.jwt = jwt
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentJWT = (state: RootState) => state.auth.jwt
