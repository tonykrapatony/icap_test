import { configureStore } from '@reduxjs/toolkit';
import { queryApi } from './queryApi';

export const store = configureStore ({
    reducer: {
        [queryApi.reducerPath]: queryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(queryApi.middleware)
})