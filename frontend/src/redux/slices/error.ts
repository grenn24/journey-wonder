import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface errorSliceState {
	notFound: boolean;
    internalServerError: boolean;
    forbidden: boolean
}
const initialState: errorSliceState = {
	notFound:false,
    internalServerError:false,
    forbidden:false
};
export const errorSlice = createSlice({
	// Name of slice
	name: "error",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setNotFound: (state, action: PayloadAction<boolean>) => {
			state.notFound = action.payload;
		},
		setInternalServerError: (state, action: PayloadAction<boolean>) => {
			state.internalServerError = action.payload;
		},
		setForbidden: (state, action: PayloadAction<boolean>) => {
			state.forbidden = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setNotFound, setInternalServerError, setForbidden } = errorSlice.actions;

const errorSliceReducer = errorSlice.reducer;

export default errorSliceReducer;
