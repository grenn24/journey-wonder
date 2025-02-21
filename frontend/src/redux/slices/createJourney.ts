import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSX } from "react";
import dayjs, { Dayjs } from "dayjs";
import { arrayContains } from "../../utilities/array";
import { UploadFile } from "antd";

interface createJourneyState {
	currentStage: number;
	title: string;
	selectedDestinations: { label: JSX.Element; key: number; value: string }[];
	startDate: Dayjs | null;
	endDate: Dayjs | null;
	image: File | null;
	selectedTravellers: string[];
}
const initialState: createJourneyState = {
	currentStage: 0,
	title: "",
	selectedDestinations: [],
	startDate: null,
	endDate: null,
	image: null,
	selectedTravellers: [],
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
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
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
		addTraveller: (state, action: PayloadAction<string>) => {
			if (!state.selectedTravellers.includes(action.payload)) {
				state.selectedTravellers = [
					...state.selectedTravellers,
					action.payload,
				];
			}
		},
		removeTraveller: (state, action: PayloadAction<string>) => {
			state.selectedTravellers = state.selectedTravellers.filter(
				(email) => email !== action.payload
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
		incrementStage: (state) => {
			state.currentStage < 1 && state.currentStage++;
		},
		decrementStage: (state) => {
			state.currentStage > 0 && state.currentStage--;
		},
		setImage: (state, action: PayloadAction<File | null>) => {
			state.image = action.payload;
		},
		deleteImage: (state) => {
			state.image = null;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const {
	reset,
	setTitle,
	setSelectedDestinations,
	addSelectedDestination,
	removeSelectedDestination,
	setEndDate,
	setStartDate,
	setDates,
	resetDates,
	incrementStage,
	decrementStage,
	setImage,
	deleteImage,
	addTraveller,
	removeTraveller,
} = createJourneySlice.actions;

const createJourneyReducer = createJourneySlice.reducer;

export default createJourneyReducer;
