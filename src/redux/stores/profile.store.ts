import profileSlice from '@/redux/slices/profile.slice';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const profileStore = () => {
  return configureStore({
    reducer: {
      profile: profileSlice
    },
  })
};

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type ProfileStore = ReturnType<typeof profileStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ProfileStore['getState']>
export type AppDispatch = ProfileStore['dispatch']

export const useAppInfoDispatch = () => useDispatch<AppDispatch>();
export const useAppInfoSelector = useSelector.withTypes<RootState>()