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
	GlobalToken,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import i18n from "../../i18n";
import { ClearRounded } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { InputAdornment, TextField } from "@mui/material";
import searchDestinations from "../createJourney/searchDestinations";

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
	const [selectedDates, setSelectedDates] = useState<
		[start: Dayjs | null | undefined, end: Dayjs | null | undefined] | null
	>([null, null]);
	const [panelMode, setPanelMode] = useState<"start" | "end">("start");
	const [destination, setDestination] = useState("");
	const [selectedDestinations, setSelectedDestinations] = useState<{ label: any; key: string; value: string }[]>([]);

	const [options, setOptions] =
		useState<{ label: any; key: string; value: string }[]>();
	return (
		<Modal
			open={openCreateModal}
			onCancel={() => setOpenCreateModal(false)}
			closeIcon={
				<Button
					variant="filled"
					color="default"
					icon={
						<ClearRounded
							style={{ marginTop: 2, marginLeft: 0 }}
							onClick={() => setOpenCreateModal(false)}
						/>
					}
				/>
			}
			title={
				<Flex justify="center">
					<Text style={{ fontSize: fontSizeHeading4 }}>
						{i18n.t("Plan a new Journey")}
					</Text>
				</Flex>
			}
			width={650}
		>
			<Flex vertical justify="center" align="center">
				<AutoComplete
					size="large"
					style={{ width: "80%" }}
					options={options}
					allowClear={false}
					value={destination}
					onSelect={(_, option) =>
						setSelectedDestinations([
							...selectedDestinations,
							option,
						])
					}
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
										<Button
											variant="text"
											color="default"
											icon={<ClearRounded />}
											onClick={() => setDestination("")}
										/>
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
								setSelectedDestinations(
									selectedDestinations.filter(
										(value) => value.key !== destination.key
									)
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

				<RangePicker
					variant="outlined"
					color="default"
					size="large"
					style={{ width: "80%" }}
					picker="date"
					minDate={dayjs()}
					format="D MMMM YYYY"
					value={selectedDates}
					onChange={(value) => setSelectedDates(value)}
					suffixIcon={null}
					renderExtraFooter={() => (
						<Flex justify="center">
							<Button
								color="primary"
								variant="text"
								onClick={() => {
									if (panelMode === "start") {
										setSelectedDates([
											dayjs(),
											selectedDates && selectedDates[1],
										]);
										setPanelMode("end");
									}
									if (panelMode === "end") {
										setSelectedDates([
											selectedDates && selectedDates[0],
											dayjs(),
										]);
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
									setSelectedDates([null, null]);
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
