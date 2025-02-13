/// <reference types="redux-persist/types" />
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";
import persistReducer from "redux-persist/lib/persistReducer";
import themeSliceReducer from "./slices/theme";
import languageSliceReducer from "./slices/language";
import userSliceReducer from "./slices/user";
import { persistStore } from "redux-persist";

// Enable map state variables
enableMapSet();

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["theme", "language", "user"], // persisted slices
};

const rootReducer = combineReducers({
	theme: themeSliceReducer,
	language: languageSliceReducer,
	user: userSliceReducer,
});

const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
});

export const persistor = persistStore(store);
export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
