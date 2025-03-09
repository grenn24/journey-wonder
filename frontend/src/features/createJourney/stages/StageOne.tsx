"use server";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
	Button,
	Flex,
	Tag,
	theme,
	DatePicker,
	Typography,
	Input,
	Card,
	Select,
	Calendar,
	Segmented,
} from "antd";
import {
	addSelectedDestination,
	removeSelectedDestination,
	resetDates,
	setEndDate,
	setStartDate,
	setTitle,
} from "../../../redux/slices/createJourney";
import CloseButton from "../../../components/CloseButton";
import dayjs from "dayjs";
import "../../../assets/styles/ant.css";
import { AnimatePresence, motion } from "motion/react";
import i18n from "../../../i18n";
import autocompleteService from "../../../services/autocomplete";
import {
	ArrowDropDownRounded,
	ExpandLessRounded,
	ExpandMoreRounded,
	KeyboardArrowLeftRounded,
	KeyboardArrowRightRounded,
} from "@mui/icons-material";

interface Destination {
	name: string;
	key: number;
	type: string;
	value: string;
}
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;
const StageOne = () => {
	const { token } = theme.useToken();
	const { colorBorder } = token;
	const { journey } = useAppSelector((state) => ({
		journey: state.createJourney,
	}));
	const dispatch = useAppDispatch();
	const [panelMode, setPanelMode] = useState<"start" | "end">("start");
	const [destinationSearchValue, setDestinationSearchValue] = useState("");

	const [isTitleExpanded, setIsTitleExpanded] = useState(
		!journey.title ||
			!journey.startDate ||
			!journey.endDate ||
			journey.destinations?.length === 0
			? true
			: false
	);
	const [isDestinationsExpanded, setIsdestinationsExpanded] = useState(false);
	const [isDatesExpanded, setIsDatesExpanded] = useState(false);

	const [destinations, setDestinations] = useState<Destination[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const [calendarMode, setCalendarMode] = useState<"month" | "year">("month");
	const [calendarValue, setCalendarValue] = useState(journey.startDate ? dayjs(journey.startDate) : dayjs());

	useEffect(() => {
		autocompleteService.abort();
		autocompleteService.controller = new AbortController();
		setIsSearching(true);
		autocompleteService
			.searchDestinations(destinationSearchValue)
			.then((data) => {
				if (data) {
					setDestinations(data);
					setIsSearching(false);
				}
			});
	}, [destinationSearchValue]);

	const monthOptions = [
		{ label: "January", value: 0 },
		{ label: "February", value: 1 },
		{ label: "March", value: 2 },
		{ label: "April", value: 3 },
		{ label: "May", value: 4 },
		{ label: "June", value: 5 },
		{ label: "July", value: 6 },
		{ label: "August", value: 7 },
		{ label: "September", value: 8 },
		{ label: "October", value: 9 },
		{ label: "November", value: 10 },
		{ label: "December", value: 11 },
	];

	return (
		<Flex vertical gap={20}>
			<Card
				onClick={() => {
					setIsTitleExpanded(!isTitleExpanded);
					setIsDatesExpanded(false);
					setIsdestinationsExpanded(false);
				}}
				styles={{
					body: {
						padding: 15,
					},
				}}
				style={{
					borderColor: colorBorder,
					position: "relative",
					cursor: "pointer",
					userSelect: "none",
				}}
				variant="borderless"
				className="card-with-elevation"
			>
				<AnimatePresence>
					{isTitleExpanded ? (
						<>
							<motion.div
								key="expanded"
								initial={{ height: 0, opacity: 0, y: -25 }}
								animate={{ height: "auto", opacity: 1, y: 0 }}
								exit={{ height: 0, opacity: 0, y: -25 }}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
							>
								<Flex vertical gap={10}>
									<Flex justify="space-between">
										<Text
											style={{
												textAlign: "left",
												width: "100%",
												fontWeight: 600,
											}}
										>
											{i18n.t("Title")}
										</Text>
										<ExpandLessRounded
											style={{ fontSize: 25 }}
										/>
									</Flex>
									<Input
										variant="borderless"
										size="large"
										placeholder={i18n.t("My trip to...")}
										value={journey.title}
										onClick={(e) => e.stopPropagation()}
										onChange={(e) =>
											dispatch(setTitle(e.target.value))
										}
										onKeyDown={(e) =>
											e.key === "Enter" &&
											setIsTitleExpanded(false)
										}
										required
										style={{
											width: "100%",
											padding: "5px 0px",
										}}
										suffix={
											<CloseButton
												variant="text"
												handleButtonClick={(e) => {
													e.stopPropagation();
													dispatch(setTitle(""));
												}}
												style={{
													opacity: journey.title
														? 1
														: 0,
													cursor: "pointer",
												}}
											/>
										}
									/>
								</Flex>
							</motion.div>
						</>
					) : (
						<motion.div
							key="collapsed"
							initial={{ height: 0, opacity: 0, y: 0 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<Flex gap={10} align="center">
								<Flex justify="space-between" flex={1}>
									<Text style={{ fontWeight: 600 }}>
										{i18n.t("Title")}
									</Text>
									<Text>{journey.title}</Text>
								</Flex>
								<ExpandMoreRounded style={{ fontSize: 25 }} />
							</Flex>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
			<Card
				onClick={() => {
					setIsdestinationsExpanded(!isDestinationsExpanded);
					setIsTitleExpanded(false);
					setIsDatesExpanded(false);
				}}
				styles={{
					body: {
						padding: 15,
					},
				}}
				style={{
					borderColor: colorBorder,
					cursor: "pointer",
					userSelect: "none",
				}}
				variant="borderless"
				className="card-with-elevation"
			>
				<AnimatePresence>
					{isDestinationsExpanded ? (
						<motion.div
							key="expanded"
							initial={{ height: 0, opacity: 0, y: -25 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: -25 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex vertical gap={10}>
								<Flex justify="space-between">
									<Text
										style={{
											textAlign: "left",
											width: "100%",
											fontWeight: 600,
										}}
									>
										{i18n.t("Destination")}
									</Text>
									<ExpandLessRounded
										style={{ fontSize: 25 }}
									/>
								</Flex>
								<div onClick={(e) => e.stopPropagation()}>
									<Select
										variant="borderless"
										mode="multiple"
										style={{ width: "100%" }}
										size="large"
										placeholder={i18n.t(
											"Japan, China, USA..."
										)}
										value={journey.destinations}
										options={destinations}
										onSearch={(value) =>
											setDestinationSearchValue(value)
										}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												setDestinationSearchValue("");
											}
										}}
										optionRender={(option) => (
											<a title="">
												<Flex
													justify="space-between"
													align="center"
													style={{ height: 32 }}
												>
													<Text>
														{option.data.name}
													</Text>
													<Tag
														bordered={false}
														style={{
															backgroundColor:
																token.colorBgTextActive,
														}}
													>
														{option.data.type}
													</Tag>
												</Flex>
											</a>
										)}
										labelRender={(label) => (
											<Text style={{ fontSize: 15 }}>
												{
													label.value
														.toString()
														.split(";")[0]
												}
											</Text>
										)}
										onSelect={(_: any, option) => {
											dispatch(
												addSelectedDestination({
													...(option as any),
												})
											);
											setDestinationSearchValue("");
										}}
										onDeselect={(value: any, _: any) => {
											dispatch(
												removeSelectedDestination(
													Number(value.split(";")[1])
												)
											);
										}}
										searchValue={destinationSearchValue}
										notFoundContent={
											destinations.length === 0 &&
											!isSearching &&
											destinationSearchValue
												? `No destinations found for ${destinationSearchValue}`
												: "Try typing something"
										}
										suffixIcon={false}
										removeIcon={
											<CloseButton variant="link" />
										}
									/>
								</div>
							</Flex>
						</motion.div>
					) : (
						<motion.div
							key="collapsed"
							initial={{ height: 0, opacity: 0, y: 0 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<Flex gap={10} align="center">
								<Flex justify="space-between" flex={1}>
									<Text
										style={{
											fontWeight: 600,
										}}
									>
										{i18n.t("Destination")}
									</Text>
									<Text>
										{journey.destinations?.length}{" "}
										{i18n.t("Places")}
									</Text>
								</Flex>
								<ExpandMoreRounded style={{ fontSize: 25 }} />
							</Flex>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
			<Card
				onClick={() => {
					setIsDatesExpanded(!isDatesExpanded);
					setIsdestinationsExpanded(false);
					setIsTitleExpanded(false);
				}}
				styles={{
					body: {
						padding: 15,
					},
				}}
				style={{
					borderColor: colorBorder,
					cursor: "pointer",
					userSelect: "none",
				}}
				variant="borderless"
				className="card-with-elevation"
			>
				<AnimatePresence>
					{isDatesExpanded ? (
						<>
							<motion.div
								key="expanded"
								initial={{ height: 0, opacity: 0, y: -25 }}
								animate={{ height: "auto", opacity: 1, y: 0 }}
								exit={{ height: 0, opacity: 0, y: -25 }}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
							>
								<Flex vertical gap={10}>
									<Flex justify="space-between">
										<Text
											style={{
												textAlign: "left",
												width: "100%",
												fontWeight: 600,
											}}
										>
											{i18n.t("Dates")}
										</Text>
										<ExpandLessRounded
											style={{ fontSize: 25 }}
										/>
									</Flex>
									<div onClick={(e) => e.stopPropagation()}>
										<Calendar
											disabledDate={(date) =>
												date.isBefore(dayjs(), "day")
											}
											headerRender={({
												value,
												type,
												onChange,
											}) => {
												const currentMonthIndex =
													value.month();
												const currentYear =
													value.year();
												const yearOptions: Object[] =
													[];
												for (
													let i = value.year() - 5;
													i <= value.year() + 5;
													i++
												) {
													yearOptions.push({
														label: i.toString(),
														value: i,
													});
												}
												return (
													<Flex vertical gap={15}>
														<Flex
															justify="space-between"
															align="center"
														>
															<Segmented
																options={[
																	{
																		label: "Month",
																		value: "month" as typeof calendarMode,
																	},
																	{
																		label: "Year",
																		value: "year" as typeof calendarMode,
																	},
																]}
																value={
																	calendarMode
																}
																onChange={(
																	value
																) => {
																	setCalendarMode(
																		value
																	);
																}}
															/>
															<Flex gap={7}>
																<Select
																	variant="filled"
																	options={
																		monthOptions
																	}
																	value={
																		currentMonthIndex
																	}
																	onChange={(
																		newMonthIndex
																	) =>
																		onChange(
																			value
																				.clone()
																				.month(
																					newMonthIndex
																				)
																		)
																	}
																	suffixIcon={
																		<ArrowDropDownRounded />
																	}
																	dropdownStyle={{
																		width: 115,
																	}}
																	placement="bottomRight"
																/>
																<Select
																	variant="filled"
																	options={
																		yearOptions
																	}
																	value={
																		currentYear
																	}
																	onChange={(
																		newYear
																	) =>
																		onChange(
																			value
																				.clone()
																				.year(
																					newYear
																				)
																		)
																	}
																	suffixIcon={
																		<ArrowDropDownRounded />
																	}
																/>
															</Flex>
														</Flex>
														<Flex
															justify="space-between"
															align="center"
														>
															<Title
																level={4}
																style={{
																	whiteSpace:
																		"pre-wrap",
																}}
															>
																{calendarMode ===
																"month"
																	? value.format(
																			"MMMM  YYYY"
																	  )
																	: value.format(
																			"YYYY"
																	  )}
															</Title>
															<Flex gap={5}>
																<Button
																	icon={
																		<KeyboardArrowLeftRounded
																			style={{
																				fontSize: 30,
																			}}
																		/>
																	}
																	variant="text"
																	color="default"
																	onClick={() => {
																		const newDate =
																			calendarMode ===
																			"month"
																				? value
																						.clone()
																						.month(
																							value.month() -
																								1
																						)
																				: value
																						.clone()
																						.year(
																							value.year() -
																								1
																						);
																		onChange(
																			newDate
																		);
																	}}
																/>
																<Button
																	icon={
																		<KeyboardArrowRightRounded
																			style={{
																				fontSize: 30,
																			}}
																		/>
																	}
																	variant="text"
																	color="default"
																	onClick={() => {
																		const newDate =
																			calendarMode ===
																			"month"
																				? value
																						.clone()
																						.month(
																							value.month() +
																								1
																						)
																				: value
																						.clone()
																						.year(
																							value.year() +
																								1
																						);
																		onChange(
																			newDate
																		);
																	}}
																/>
															</Flex>
														</Flex>
													</Flex>
												);
											}}
											mode={calendarMode}
											fullscreen={false}
											onPanelChange={() => {}}
											value={calendarValue}
											onChange={(date) =>
												setCalendarValue(date)
											}
											fullCellRender={(date, info) =>
												calendarMode === "month" ? (
													<Button
														type={
															date.isSame(
																dayjs(
																	journey.startDate
																)
															) ||
															date.isSame(
																dayjs(
																	journey.endDate
																)
															) ||
															(date.isAfter(
																dayjs(
																	journey.startDate
																)
															) &&
																date.isBefore(
																	dayjs(
																		journey.endDate
																	)
																))
																? "primary"
																: "text"
														}
														disabled={date.isBefore(
															dayjs(),
															"day"
														)}
														style={{
															width: 40,
															height: 40,
															fontSize: 18,
															margin: 0,
															opacity:
																date.month() !==
																calendarValue.month()     ? 0.4 : 1
														}}
														onClick={() => {
															if (
																date.isSame(
																	journey.startDate
																)
															) {
																dispatch(
																	setStartDate(
																		null
																	)
																);
																dispatch(
																	setEndDate(
																		null
																	)
																);
															} else if (
																date.isSame(
																	journey.endDate
																)
															) {
																dispatch(
																	setEndDate(
																		null
																	)
																);
															} else if (
																!journey.startDate
															) {
																// Case 1: If no start date is set, set the selected date as the start date
																dispatch(
																	setStartDate(
																		date.toISOString()
																	)
																);
															} else if (
																!journey.endDate
															) {
																// Case 2: If start date is set but no end date, determine whether to set start or end
																if (
																	date.isBefore(
																		journey.startDate
																	)
																) {
																	dispatch(
																		setStartDate(
																			date.toISOString()
																		)
																	);
																} else {
																	dispatch(
																		setEndDate(
																			date.toISOString()
																		)
																	);
																}
															} else {
																// Case 3: Both start and end dates are set
																if (
																	date.isBefore(
																		journey.startDate
																	)
																) {
																	// If selected date is before start date, update start and reset end date
																	dispatch(
																		setStartDate(
																			date.toISOString()
																		)
																	);
																	dispatch(
																		setEndDate(
																			null
																		)
																	);
																} else if (
																	date.isAfter(
																		journey.endDate
																	)
																) {
																	// If selected date is after end date, update end date
																	dispatch(
																		setEndDate(
																			date.toISOString()
																		)
																	);
																} else {
																	// If selected date is between start and end dates, update start date
																	dispatch(
																		setStartDate(
																			date.toISOString()
																		)
																	);
																}
															}
														}}
													>
														{date.date()}
													</Button>
												) : (
													<Button
														style={{
															fontSize: 18,
															margin: 0,
														}}
														type={
															calendarValue.month() ===
															date.month()
																? "primary"
																: "text"
														}
														onClick={() => {
															setCalendarMode(
																"month"
															);
															setCalendarValue(
																calendarValue
																	.clone()
																	.month(
																		date.month()
																	)
															);
														}}
													>
														{
															monthOptions[
																date.month()
															].label
														}
													</Button>
												)
											}
										/>
									</div>
								</Flex>
							</motion.div>
						</>
					) : (
						<motion.div
							key="collapsed"
							initial={{ height: 0, opacity: 0, y: 0 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<Flex gap={10} align="center">
								<Flex justify="space-between" flex={1}>
									<Text style={{ fontWeight: 600 }}>
										{i18n.t("Dates")}
									</Text>
									{journey.startDate && journey.endDate && (
										<Text
											style={{
												whiteSpace: "pre-wrap",
											}}
										>
											{dayjs(journey.startDate)?.format(
												"D/M/YYYY"
											) +
												"  -  " +
												dayjs(journey.endDate)?.format(
													"D/M/YYYY"
												)}
										</Text>
									)}
								</Flex>
								<ExpandMoreRounded style={{ fontSize: 25 }} />
							</Flex>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
		</Flex>
	);
};

export default StageOne;
