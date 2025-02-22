import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSX } from "react";
import dayjs, { Dayjs } from "dayjs";
import { arrayContains } from "../../utilities/array";
import { UploadFile } from "antd";
import { compressImageFile } from "../../utilities/file";

interface createJourneyState {
	currentStage: number;
	title: string;
	selectedDestinations: {
		value: string;
		name: string;
		type: string;
		id: number;
	}[];
	startDate: Dayjs | null;
	endDate: Dayjs | null;
	image: File | null;
	selectedTravellers: { email: string; permission: "Read" | "Edit" }[];
	visibility: "Public" | "Travellers" | "Only Me";
}
const initialState: createJourneyState = {
	currentStage: 0,
	title: "",
	selectedDestinations: [],
	startDate: null,
	endDate: null,
	image: null,
	selectedTravellers: [],
	visibility: "Travellers",
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
				{ value: string; name: string; type: string; id: number }[]
			>
		) => {
			state.selectedDestinations = action.payload;
		},
		addSelectedDestination: (
			state,
			action: PayloadAction<{
				value: string;
				name: string;
				type: string;
				id: number;
			}>
		) => {
			if (
				!arrayContains(
					state.selectedDestinations,
					action.payload,
					(x, y) => x?.name === y.name
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
				(value) => value.id !== action.payload
			);
		},
		addTraveller: (
			state,
			action: PayloadAction<{
				email: string;
				permission: "Read" | "Edit";
			}>
		) => {
			if (
				!arrayContains(
					state.selectedTravellers,
					action.payload,
					(x, y) => x.email === y.email
				)
			) {
				state.selectedTravellers = [
					...state.selectedTravellers,
					action.payload,
				];
			}
		},
		removeTraveller: (
			state,
			action: PayloadAction<{
				email: string;
				permission: "Read" | "Edit";
			}>
		) => {
			state.selectedTravellers = state.selectedTravellers.filter(
				(traveller) => traveller.email !== action.payload.email
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
			if (action.payload) {
				compressImageFile(action.payload, 5)
					.then((file) => {
						state.image = file;
					})
					.catch((err) => console.log(err));
			} else {
				state.image = null;
			}
		},
		deleteImage: (state) => {
			state.image = null;
		},
		setVisibility: (
			state,
			action: PayloadAction<"Public" | "Travellers" | "Only Me">
		) => {
			state.visibility = action.payload;
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
	setVisibility,
} = createJourneySlice.actions;

const createJourneyReducer = createJourneySlice.reducer;

export default createJourneyReducer;
