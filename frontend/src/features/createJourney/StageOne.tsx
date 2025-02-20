import React, { JSX, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
	AutoComplete,
	Button,
	Flex,
	Tag,
	theme,
	DatePicker,
	Typography,
	Input,
	Divider,
	Card,
} from "antd";
import { InputAdornment, TextField, ThemeProvider } from "@mui/material";
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
import { useMuiTheme } from "../../styles/useTheme";
import ScrollableDiv from "../../components/ScrollableDiv";
import "../../styles/ant.css";

const { RangePicker } = DatePicker;
const { Text } = Typography;
const StageOne = () => {
	const { token } = theme.useToken();
	const muiTheme = useMuiTheme();
	const {
		colorBgContainer,
		borderRadius,
		fontSizeHeading5,
		colorText,
		colorPrimary,
		colorPrimaryBg,
		colorPrimaryBorder,
		colorBorder,
		colorPrimaryBorderHover,
		colorPrimaryActive,
		colorPrimaryText,
		fontFamily,
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
		_:any,
		option: { label: JSX.Element; key: number; value: string }
	) => {
		setDestination("");
		const selectedDestination = {
			label: option.label,
			key: option.key,
			value: option.value,
		};
		dispatch(addSelectedDestination(selectedDestination));
	};
	const [isTitleExpanded, setIsTitleExpanded] = useState(false);
	const [isDestinationExpanded, setIsDestinationExpanded] = useState(false);
	const [isDatesExpanded, setIsDatesExpanded] = useState(false);
	return (
		<Flex vertical gap={15}>
			<Card
				onClick={() => {
					setIsTitleExpanded(!isTitleExpanded);
					setIsDatesExpanded(false);
					setIsDestinationExpanded(false);
				}}
				styles={{
					body: {
						padding: 15,
					},
				}}
				style={{ borderWidth: 2, borderColor: colorBorder }}
			>
				{isTitleExpanded ? (
					<Flex vertical gap={10}>
						<Text style={{ textAlign: "left", width: "100%" }}>
							Title
						</Text>
						<Input
							size="large"
							placeholder="My trip to ..."
							value={title}
							onClick={(e) => e.stopPropagation()}
							onChange={(e) => dispatch(setTitle(e.target.value))}
							onKeyDown={(e) =>
								e.key === "Enter" && setIsTitleExpanded(false)
							}
							required
							style={{ width: "100%" }}
							suffix={
								<CloseButton
									variant="text"
									handleButtonClick={(e) => {
										e.stopPropagation();
										dispatch(setTitle(""));
									}}
									style={{
										opacity: title ? 1 : 0,
										cursor: "pointer",
									}}
								/>
							}
						/>
					</Flex>
				) : (
					<Flex justify="space-between">
						<Text>Title</Text>
						<Text>{title}</Text>
					</Flex>
				)}
				<Button
					onClick={() => setIsTitleExpanded(false)}
					variant="text"
					color="default"
					style={{
						position: "absolute",
						display: isTitleExpanded ? "flex" : "none",
						top: 10,
						right: 10,
					}}
					size="small"
					icon={<ClearRounded />}
				/>
			</Card>
			<Card
				onClick={() => {
					setIsDestinationExpanded(!isDestinationExpanded);
					setIsTitleExpanded(false);
					setIsDatesExpanded(false);
				}}
				styles={{
					body: {
						padding: 15,
					},
				}}
				style={{ borderWidth: 2, borderColor: colorBorder }}
			>
				{isDestinationExpanded ? (
					<Flex vertical gap={10}>
						<Text style={{ textAlign: "left", width: "100%" }}>
							Destination(s)
						</Text>
						<div onClick={(e) => e.stopPropagation()}>
							<AutoComplete
								style={{
									width: "100%",
									height:50,
									color: "red",
						
								}}
								options={options}
								allowClear={false}
								value={destination}
								onSelect={handleDestinationSelect}
							>
								<Input
									placeholder="Japan, China, USA ..."
									size="large"
									value={destination}
									onChange={(e) => {
										setDestination(e.target.value);
										setOptions(
											searchDestinations(
												e.target.value,
												token
											)
										);
									}}
									type="text"
									required
									suffix={
										<CloseButton
											variant="text"
											handleButtonClick={(e) => {
												e.stopPropagation();
												setDestination("");
												setOptions([]);
											}}
											style={{
												opacity: destination ? 1 : 0,
												cursor: "pointer",
											}}
										/>
									}
								/>
							</AutoComplete>
						</div>
						<ScrollableDiv
							height={50}
							style={{
								display:
									selectedDestinations.length === 0
										? "none"
										: "flex",
							}}
						>
							{selectedDestinations?.map((destination) => (
								<Tag
									bordered
									closeIcon={
										<ClearRounded
											style={{
												fontSize: 16,
												marginLeft: 8,
											}}
										/>
									}
									onClose={() =>
										dispatch(
											removeSelectedDestination(
												destination.key
											)
										)
									}
									onClick={(e) => e.stopPropagation()}
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
						</ScrollableDiv>
					</Flex>
				) : (
					<Flex justify="space-between">
						<Text>Destination(s)</Text>
						<Text>{selectedDestinations.length} Places</Text>
					</Flex>
				)}
				<Button
					onClick={() => setIsDestinationExpanded(false)}
					variant="text"
					color="default"
					style={{
						position: "absolute",
						display: isDestinationExpanded ? "flex" : "none",
						top: 10,
						right: 10,
					}}
					size="small"
					icon={<ClearRounded />}
				/>
			</Card>
			<Card
				onClick={() => {
					setIsDatesExpanded(!isDatesExpanded);
					setIsDestinationExpanded(false);
					setIsTitleExpanded(false);
				}}
				styles={{
					body: {
						padding: 15,
					},
				}}
				style={{ borderWidth: 2, borderColor: colorBorder }}
			>
				{isDatesExpanded ? (
					<>
						<Text style={{ textAlign: "left", width: "100%" }}>
							Dates
						</Text>
						<div onClick={(e) => e.stopPropagation()}>
							<RangePicker
								required
								variant="outlined"
								color="default"
								size="large"
								style={{ width: "100%", marginTop: 10 }}
								picker="date"
								minDate={dayjs()}
								format="D MMMM YYYY"
								value={[startDate, endDate]}
								onClick={(e) => e.stopPropagation()}
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
													dispatch(
														setStartDate(dayjs())
													);
													dispatch(
														setEndDate(endDate)
													);
													setPanelMode("end");
												}
												if (panelMode === "end") {
													dispatch(
														setStartDate(startDate)
													);
													dispatch(
														setEndDate(dayjs())
													);
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
						</div>
					</>
				) : (
					<Flex justify="space-between">
						<Text>Dates</Text>
						{startDate && endDate && (
							<Text style={{ whiteSpace: "pre-wrap" }}>
								{startDate?.format("D MMMM YYYY") +
									"  -  " +
									endDate?.format("D MMMM YYYY")}
							</Text>
						)}
					</Flex>
				)}
				<Button
					onClick={() => setIsDatesExpanded(false)}
					variant="text"
					color="default"
					style={{
						position: "absolute",
						display: isDatesExpanded ? "flex" : "none",
						top: 10,
						right: 10,
					}}
					size="small"
					icon={<ClearRounded />}
				/>
			</Card>
		</Flex>
	);
};

export default StageOne;
