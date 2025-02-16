import React, { JSX, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AutoComplete, Button, Flex, Tag, theme, DatePicker } from "antd";
import { InputAdornment, TextField } from "@mui/material";
import {
	addSelectedDestination,
	removeSelectedDestination,
	resetDates,
	setEndDate,
	setStartDate,
	setTitle,
} from "../../redux/slices/createJourney";
import CloseButton from "../../components/CloseButton";
import searchDestinations from "./searchDestinations";
import { ClearRounded } from "@mui/icons-material";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const StageOne = () => {
	const { token } = theme.useToken();
	const {
		colorBgContainer,
		borderRadius,
		fontSizeHeading5,
		colorText,
		colorPrimary,
		colorPrimaryBg,
		colorBorder,
		colorPrimaryBorderHover,
		colorPrimaryActive,
		colorPrimaryText,
		colorBgTextActive,
		colorBgSolid,
	} = token;
	const { title, selectedDestinations, startDate, endDate } = useAppSelector(
		(state) => ({
			title: state.createJourney.title,
			selectedDestinations: state.createJourney.selectedDestinations,
			startDate: state.createJourney.startDate,
			endDate: state.createJourney.endDate,
		})
	);
	const dispatch = useAppDispatch();
	const [panelMode, setPanelMode] = useState<"start" | "end">("start");
	const [destination, setDestination] = useState("");
	const [options, setOptions] = useState<
		{ label: JSX.Element; key: number; value: string }[]
	>([]);
	const handleDestinationSelect = (
		_: any,
		option: { label: JSX.Element; key: number; value: string }
	) => {
		const selectedDestination = {
			label: option.label,
			key: option.key,
			value: option.value,
		};
		dispatch(addSelectedDestination(selectedDestination));
	};
	return (
		<Flex vertical justify="center" align="center">
			<TextField
				label="Title"
				placeholder="My trip to ..."
				size="small"
				value={title}
				onChange={(e) => dispatch(setTitle(e.target.value))}
				type="text"
				required
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: borderRadius,
						"&:hover fieldset": {
							borderColor: colorPrimaryBorderHover, // Border color on hover
						},
						"&.Mui-focused fieldset": {
							borderColor: colorPrimaryBorderHover, // Border color when focused
						},
						"& .MuiInputLabel-root.Mui-focused": {
							color: "red",
						}, // Label color when focused
					},
					width: "80%",
				}}
				slotProps={{
					inputLabel: {
						sx: {
							"&.Mui-focused": {
								color: colorPrimaryText,
							}, // Color when focused
						},
					},
					input: {
						endAdornment: (
							<InputAdornment position="end">
								{title && (
									<CloseButton
										variant="text"
										handleButtonClick={() =>
											dispatch(setTitle(""))
										}
									/>
								)}
							</InputAdornment>
						),
					},
				}}
			/>
			<br />
			<AutoComplete
				size="large"
				style={{ width: "80%" }}
				options={options}
				allowClear={false}
				value={destination}
				onSelect={handleDestinationSelect}
			>
				<TextField
					label="Destination"
					placeholder="Japan, China, USA ..."
					size="small"
					value={destination}
					onChange={(e) => {
						setDestination(e.target.value);
						setOptions(searchDestinations(e.target.value, token));
					}}
					type="text"
					required
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: borderRadius,
							"&:hover fieldset": {
								borderColor: colorPrimaryBorderHover, // Border color on hover
							},
							"&.Mui-focused fieldset": {
								borderColor: colorPrimaryBorderHover, // Border color when focused
							},
							"& .MuiInputLabel-root.Mui-focused": {
								color: "red",
							}, // Label color when focused
						},
					}}
					slotProps={{
						inputLabel: {
							sx: {
								"&.Mui-focused": {
									color: colorPrimaryText,
								}, // Color when focused
							},
						},
						input: {
							endAdornment: (
								<InputAdornment position="end">
									{destination && (
										<CloseButton
											variant="text"
											handleButtonClick={() => {
												setDestination("");
												setOptions([]);
											}}
										/>
									)}
								</InputAdornment>
							),
						},
					}}
				/>
			</AutoComplete>
			<Flex style={{ width: "80%" }}>
				{selectedDestinations?.map((destination) => (
					<Tag
						bordered
						closeIcon={
							<ClearRounded
								style={{ fontSize: 16, marginLeft: 8 }}
							/>
						}
						onClose={() =>
							dispatch(removeSelectedDestination(destination.key))
						}
						style={{
							borderColor: colorBorder,
							backgroundColor: colorBgContainer,

							padding: "5px 12px",

							display: "flex",
							alignItems: "center",
						}}
					>
						{destination.value}
					</Tag>
				))}
			</Flex>
			<br />
			<RangePicker
			required
				variant="outlined"
				color="default"
				size="large"
				style={{ width: "80%" }}
				picker="date"
				minDate={dayjs()}
				format="D MMMM YYYY"
				value={[startDate, endDate]}
				onChange={(value) => {
					if (value) {
						dispatch(setStartDate(value[0]));
						dispatch(setEndDate(value[1]));
					} else {
						dispatch(resetDates());
					}
				}}
				suffixIcon={null}
				renderExtraFooter={() => (
					<Flex justify="center">
						<Button
							color="primary"
							variant="text"
							onClick={() => {
								if (panelMode === "start") {
									dispatch(setStartDate(dayjs()));
									dispatch(setEndDate(endDate));
									setPanelMode("end");
								}
								if (panelMode === "end") {
									dispatch(setStartDate(startDate));
									dispatch(setEndDate(dayjs()));
									setPanelMode("start");
								}
							}}
						>
							Today
						</Button>
						<Button
							color="primary"
							variant="text"
							onClick={() => {
								dispatch(setStartDate(null));
								dispatch(setEndDate(null));
							}}
						>
							Reset
						</Button>
					</Flex>
				)}
			/>
		</Flex>
	);
};

export default StageOne;
