import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types'
import type { RootState } from '../app/store'
import { createAppSlice } from '../app/createAppSlice'

type AuthState = {
  user: User | null
  token: string | null
}

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User | null; token: string | null }>,
    ) => {
      state.user = user
      state.token = token
    },
  },
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
