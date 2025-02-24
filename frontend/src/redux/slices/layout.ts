import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface layoutSliceState {
	splitterSize: number[];
}
const initialState: layoutSliceState = {
	splitterSize: [
		0.1 * document.documentElement.clientWidth < 100
			? 100
			: 0.1 * document.documentElement.clientWidth,
		0.1 * document.documentElement.clientWidth < 100
			? document.documentElement.clientWidth - 100
			: document.documentElement.clientWidth -
			  0.1 * document.documentElement.clientWidth,
	],
};
export const layoutSlice = createSlice({
	// Name of slice
	name: "layout",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setSplitterSize: (state, action: PayloadAction<number[]>) => {
			state.splitterSize = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setSplitterSize } = layoutSlice.actions;

const layoutSliceReducer = layoutSlice.reducer;

export default layoutSliceReducer;
