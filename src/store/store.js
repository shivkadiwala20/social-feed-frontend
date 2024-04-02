import { configureStore } from '@reduxjs/toolkit';
// import { authApi } from './apis/authApi';
import { apiInterFace } from './apis/apiInterFace';
// import { userApi } from './apis/userApi';

export const store = configureStore({
  reducer: {
    [apiInterFace.reducerPath]: apiInterFace.reducer,
    // [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiInterFace.middleware),

});
