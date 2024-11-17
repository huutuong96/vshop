
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  accessToken: ''
} as {
  accessToken: string
}

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    }
  }
})

export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;