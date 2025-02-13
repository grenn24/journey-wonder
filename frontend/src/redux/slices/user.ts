import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userSliceState {
	userID: string;
	name:string;
}
const initialState: userSliceState = {
	userID: "",
	name:""
};
export const userSlice = createSlice({
	// Name of slice
	name: "user",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setUserID: (state, action: PayloadAction<string>) => {
			state.userID = action.payload;
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setUserID, setName } = userSlice.actions;

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
