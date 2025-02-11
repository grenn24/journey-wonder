/// <reference types="redux-persist/types" />
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";
import persistReducer from "redux-persist/lib/persistReducer";
import themeSliceReducer from "./slices/theme";

// Enable map state variables
enableMapSet();

const persistConfig = {
	key: "root",
	storage,
	whitelist: [], // persisted slices
};

const store = configureStore({
	reducer: { theme: themeSliceReducer },
});

export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
