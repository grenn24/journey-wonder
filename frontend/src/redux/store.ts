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

import errorSliceReducer from "./slices/error.ts";
import layoutSliceReducer from "./slices/layout.ts";
import createJourneySliceReducer  from "./slices/createJourney.ts";

// Enable map state variables
enableMapSet();

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["theme", "language", "user","createJourney", "layout"], // persisted slices
};

const rootReducer = combineReducers({
	theme: themeSliceReducer,
	language: languageSliceReducer,
	user: userSliceReducer,
	createJourney: createJourneySliceReducer,
	error: errorSliceReducer,
	layout:layoutSliceReducer
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedRootReducer,
});

export const persistor = persistStore(store);
export default store;

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
