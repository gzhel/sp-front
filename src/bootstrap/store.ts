import { configureStore } from '@reduxjs/toolkit';
import { configReducer } from '@config/store';

export const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export type _OriginRootState = ReturnType<typeof store.getState>;
export type _OriginDispatch = typeof store.dispatch;
