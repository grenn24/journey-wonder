import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface createJourneyState {
	destination: string;
}
const initialState: createJourneyState = {
	destination: ""
};
export const createJourneySlice = createSlice({
	// Name of slice
	name: "create journey",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setDestination: (state, action: PayloadAction<string>) => {
			state.destination = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setDestination } = createJourneySlice.actions;

const createJourneyReducer = createJourneySlice.reducer;

export default createJourneyReducer;
