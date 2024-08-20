import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import statesReducer from "./slice";
import { apiQuery } from "../api/apiQuery";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//REDUX-PERSIST CONFIG
const persisConfig = {
  version: 1,
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  [apiQuery.reducerPath]: apiQuery.reducer,
  root: persistReducer(persisConfig, statesReducer),
});
// const rootReducers = persistReducer(persisConfig, statesReducer);
// {
//   [apiQuery.reducerPath]: apiQuery.reducer,
//   root: rootReducers,
// },

export const store = configureStore({
  reducer: rootReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiQuery.middleware),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
