import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Language {
	EnglishUK = "EnglishUK",
	ChineseSimplified = "中文（简体）",
	Japanese = "日本語",
}

interface languageSliceState {
	language: Language;
}
const initialState: languageSliceState = {
	language: Language.EnglishUK,
};
export const languageSlice = createSlice({
	// Name of slice
	name: "language",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setLanguage: (state, action: PayloadAction<Language>) => {
			
			state.language = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setLanguage } = languageSlice.actions;

const languageSliceReducer = languageSlice.reducer;

export default languageSliceReducer;
