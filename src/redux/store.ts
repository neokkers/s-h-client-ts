import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import playerReducer from "./slices/playerSlice";
import logger from "redux-logger";

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    player: playerReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
