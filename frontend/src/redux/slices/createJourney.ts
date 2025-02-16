import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSX } from "react";
import dayjs, { Dayjs } from "dayjs";
import { arrayContains } from "../../utilities/array";

interface createJourneyState {
	selectedDestinations: { label: JSX.Element; key: number; value: string }[];
	startDate: Dayjs | null;
	endDate: Dayjs | null;
}
const initialState: createJourneyState = {
	selectedDestinations: [],
	startDate: null,
	endDate: null,
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
		setSelectedDestinations: (
			state,
			action: PayloadAction<
				{ label: JSX.Element; key: number; value: string }[]
			>
		) => {
			state.selectedDestinations = action.payload;
		},
		addSelectedDestination: (
			state,
			action: PayloadAction<{
				label: JSX.Element;
				key: number;
				value: string;
			}>
		) => {
			if (
				!arrayContains(
					state.selectedDestinations,
					action.payload,
					(x, y) => x?.value === y.value
				)
			) {
				state.selectedDestinations = [
					...state.selectedDestinations,
					action.payload,
				];
			}
		},
		removeSelectedDestination: (state, action: PayloadAction<number>) => {
			state.selectedDestinations = state.selectedDestinations.filter(
				(value) => value.key !== action.payload
			);
		},
		setStartDate: (state, action: PayloadAction<Dayjs | null>) => {
			state.startDate = action.payload;
		},
		setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
			state.endDate = action.payload;
		},
		setDates: (state, action: PayloadAction<(Dayjs | null)[]>) => {
			state.startDate = action.payload[0];
			state.endDate = action.payload[1];
		},
		resetDates: (state) => {
			state.endDate = null;
			state.startDate = null;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const {
	reset,
	setSelectedDestinations,
	addSelectedDestination,
	removeSelectedDestination,
	setEndDate,
	setStartDate,
	setDates,
	resetDates,
} = createJourneySlice.actions;

const createJourneyReducer = createJourneySlice.reducer;

export default createJourneyReducer;
