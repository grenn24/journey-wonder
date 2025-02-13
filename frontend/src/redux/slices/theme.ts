import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Theme{
	Light = "light",
	Dark = "dark"
}
interface themeSliceState {
	theme: Theme;
}
const initialState: themeSliceState = {
	theme: Theme.Light,
};
export const themeSlice = createSlice({
	// Name of slice
	name: "theme",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setTheme } = themeSlice.actions;

const themeSliceReducer = themeSlice.reducer;

export default themeSliceReducer;
