import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayContains } from "../../utilities/array";
import { compressImageFile, fileToBase64Url } from "../../utilities/file";

interface createJourneyState {
	currentStage: number;
	title: string;
	selectedDestinations: {
		value: string;
		name: string;
		type: string;
		id: number;
	}[];
	startDate: string | null | undefined;
	endDate: string | null | undefined;
	image: [string, string] | null;
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

export const compressAndSetImage = createAsyncThunk(
	"create journey/compress image",
	async (file: File | null, { rejectWithValue }) => {
		try {
			let image : [string,string]| null;
			if (file) {
				const compressedImage = await compressImageFile(file, 15);
				const imageURL = await fileToBase64Url(compressedImage);
				const imageName = file.name;
				image = [imageURL, imageName]
			} else {
				image = null;
			}
			return image;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
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
		setStartDate: (
			state,
			action: PayloadAction<string | null | undefined>
		) => {
			state.startDate = action.payload;
		},
		setEndDate: (
			state,
			action: PayloadAction<string | null | undefined>
		) => {
			state.endDate = action.payload;
		},
		setDates: (state, action: PayloadAction<(string | null)[]>) => {
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
		setImage: (state, action: PayloadAction<[string, string] | null>) => {
			state.image = action.payload;
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
	extraReducers: (builder) => {
		builder.addCase(
			compressAndSetImage.fulfilled,
			(state, action: PayloadAction<[string, string] | null>) => {
				state.image = action.payload;
			}
		);
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

const createJourneySliceReducer = createJourneySlice.reducer;

export default createJourneySliceReducer;
