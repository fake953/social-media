import { configureStore } from "@reduxjs/toolkit";
import { apiQuery } from "../services/apiQuery";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiQuery.reducerPath]: apiQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiQuery.middleware),
});
setupListeners(store.dispatch);
