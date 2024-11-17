import { configureStore } from '@reduxjs/toolkit';
import accessTokenSlice from '@/redux/slices/access-token-slice';

export const privateStore = configureStore({
  reducer: {
    accessToken: accessTokenSlice
  },
});

export type PrivateRootState = ReturnType<typeof privateStore.getState>;
export type PrivateAppDispatch = typeof privateStore.dispatch;