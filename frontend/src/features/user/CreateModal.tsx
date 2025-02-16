import {
	AutoComplete,
	Button,
	Flex,
	Input,
	Modal,
	theme,
	Typography,
	DatePicker,
	Tag,
} from "antd";
import React, { JSX, useEffect, useMemo, useState } from "react";
import i18n from "../../i18n";
import { ClearRounded } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { InputAdornment, TextField } from "@mui/material";
import searchDestinations from "../createJourney/searchDestinations";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
	setStartDate,
	setEndDate,
	setSelectedDestinations,
	resetDates,
	addSelectedDestination,
	removeSelectedDestination,
	setDates,
} from "../../redux/slices/createJourney.ts";
import CloseButton from "../../components/CloseButton.tsx";
import { arrayContains } from "../../utilities/array.ts";

interface Prop {
	openCreateModal: boolean;
	setOpenCreateModal: (value: boolean) => void;
}

const { Text } = Typography;
const { RangePicker } = DatePicker;
const CreateModal = ({ openCreateModal, setOpenCreateModal }: Prop) => {
	const { token } = theme.useToken();
	const {
		colorBgContainer,
		borderRadius,
		fontSizeHeading5,
		colorText,
		fontWeightStrong,
		fontSizeHeading4,
		fontSizeHeading3,
		colorTextHeading,
		colorPrimary,
		colorPrimaryBg,
		colorBorder,
		colorPrimaryBorderHover,
		colorPrimaryActive,
		colorPrimaryText,
		colorBgTextActive,
		colorBgSolid,
	} = token;

	const dispatch = useAppDispatch();
	const [panelMode, setPanelMode] = useState<"start" | "end">("start");
	const [destination, setDestination] = useState("");
	const { selectedDestinations, startDate, endDate } = useAppSelector(
		(state) => ({
			selectedDestinations: state.createJourney.selectedDestinations,
			startDate: state.createJourney.startDate,
			endDate: state.createJourney.endDate,
		})
	);
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
		<Modal
			open={openCreateModal}
			onCancel={() => setOpenCreateModal(false)}
			closeIcon={
				<CloseButton
					handleButtonClick={() => setOpenCreateModal(false)}
				/>
			}
			title={
				<Flex justify="center" style={{ marginBottom: 35 }}>
					<Text
						style={{
							fontSize: fontSizeHeading3,
							fontFamily: "Roboto",
							fontWeight: fontWeightStrong,
						}}
					>
						{i18n.t("Plan a new journey")}
					</Text>
				</Flex>
			}
			width={650}
			footer={false}
		>
			<Flex vertical justify="center" align="center">
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
							setOptions(
								searchDestinations(e.target.value, token)
							);
						}}
						type="text"
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
								dispatch(
									removeSelectedDestination(destination.key)
								)
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
		</Modal>
	);
};

export default CreateModal;
