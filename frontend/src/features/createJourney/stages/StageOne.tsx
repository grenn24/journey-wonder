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
import "../../../styles/ant.css";
import { AnimatePresence, motion } from "motion/react";
import i18n from "../../../i18n";
import autocompleteService from "../../../services/autocomplete";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";

interface Destination {
	name: string;
	key: number;
	type: string;
	value: string;
}
const { RangePicker } = DatePicker;
const { Text } = Typography;
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
			journey.destinations.length === 0
			? true
			: false
	);
	const [isDestinationsExpanded, setIsdestinationsExpanded] = useState(false);
	const [isDatesExpanded, setIsDatesExpanded] = useState(false);

	const [destinations, setDestinations] = useState<Destination[]>([]);
	const [isSearching, setIsSearching] = useState(false);

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
										<Flex gap={15}>
											<DatePicker
												value={journey.startDate}
												placeholder="Start"
												minDate={dayjs()}
												maxDate={
													journey.endDate
														? dayjs(journey.endDate)
														: undefined
												}
												onChange={(value) =>
													dispatch(
														setStartDate(
															value ? value : null
														)
													)
												}
												suffixIcon={false}
												format="D MMMM YYYY"
												
											/>
											<DatePicker
												value={journey.endDate}
												placeholder="End"
												minDate={
													journey.startDate
														? dayjs(
																journey.startDate
														  )
														: dayjs()
												}
												onChange={(value) =>
													dispatch(
														setEndDate(
															value ? value : null
														)
													)
												}
												suffixIcon={false}
												format="D MMMM YYYY"
											/>
										</Flex>
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
											style={{ whiteSpace: "pre-wrap" }}
										>
											{dayjs(journey.startDate).format(
												"D MMMM YYYY"
											) +
												"  -  " +
												dayjs(journey.endDate).format(
													"D MMMM YYYY"
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
