"use server"
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
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
} from "../../redux/slices/createJourney";
import CloseButton from "../../components/CloseButton";
import dayjs from "dayjs";
import "../../styles/ant.css";
import { AnimatePresence, motion } from "motion/react";
import destinations from "../../data/destinations/destinations";
import i18n from "../../i18n";

const { RangePicker } = DatePicker;
const { Text } = Typography;
const StageOne = () => {
	const memoisedDestinations = useMemo(() => destinations, []);
	const { token } = theme.useToken();
	const { colorBorder } = token;
	const { title, selectedDestinations, startDate, endDate } = useAppSelector(
		(state) => ({
			title: state.createJourney?.title,
			selectedDestinations: state.createJourney?.selectedDestinations,
			startDate: state.createJourney?.startDate,
			endDate: state.createJourney?.endDate,
		})
	);
	const dispatch = useAppDispatch();
	const [panelMode, setPanelMode] = useState<"start" | "end">("start");
	const [destinationSearchValue, setDestinationSearchValue] = useState("");

	const [isTitleExpanded, setIsTitleExpanded] = useState(false);
	const [isDestinationsExpanded, setIsdestinationsExpanded] = useState(false);
	const [isDatesExpanded, setIsDatesExpanded] = useState(false);

	return (
		<Flex vertical gap={15}>
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
					borderWidth: 2,
					borderColor: colorBorder,
					position: "relative",
				}}
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
									<Text
										style={{
											textAlign: "left",
											width: "100%",
										}}
									>
										{i18n.t("Title")}
									</Text>
									<Input
										size="large"
										placeholder={i18n.t("My trip to...")}
										value={title}
										onClick={(e) => e.stopPropagation()}
										onChange={(e) =>
											dispatch(setTitle(e.target.value))
										}
										onKeyDown={(e) =>
											e.key === "Enter" &&
											setIsTitleExpanded(false)
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
							<Flex justify="space-between">
								<Text>{i18n.t("Title")}</Text>
								<Text>{title}</Text>
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
				style={{ borderWidth: 2, borderColor: colorBorder }}
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
								<Text
									style={{ textAlign: "left", width: "100%" }}
								>
									{i18n.t("Destination")}
								</Text>
								<div onClick={(e) => e.stopPropagation()}>
									<Select
										mode="multiple"
										style={{ width: "100%" }}
										size="large"
										placeholder={i18n.t(
											"Japan, China, USA..."
										)}
										value={selectedDestinations}
										options={memoisedDestinations}
										onSearch={(value) =>
											setDestinationSearchValue(value)
										}
										optionRender={(option) => (
											<Flex
												justify="space-between"
												align="center"
												style={{ height: 32 }}
											>
												<Text>{option.data.name}</Text>
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
										onDeselect={(_: any, option) =>
											dispatch(
												removeSelectedDestination(
													option.id
												)
											)
										}
										searchValue={destinationSearchValue}
										notFoundContent={`No destinations found for ${destinationSearchValue}`}
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
							<Flex justify="space-between">
								<Text>{i18n.t("Destination")}</Text>
								<Text>
									{selectedDestinations?.length}{" "}
									{i18n.t("Places")}
								</Text>
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
				style={{ borderWidth: 2, borderColor: colorBorder }}
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
								<Text
									style={{ textAlign: "left", width: "100%" }}
								>
									{i18n.t("Dates")}
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
										value={[
											startDate ? dayjs(startDate) : null,
											endDate ? dayjs(endDate) : null,
										]}
										onClick={(e) => e.stopPropagation()}
										onChange={(value) => {
											if (value && value[0] && value[1]) {
												dispatch(
													setStartDate(
														value[0].toISOString()
													)
												);
												dispatch(
													setEndDate(
														value[1].toISOString()
													)
												);
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
														if (
															panelMode ===
															"start"
														) {
															dispatch(
																setStartDate(
																	dayjs().toISOString()
																)
															);
															dispatch(
																setEndDate(
																	endDate
																)
															);
															setPanelMode("end");
														}
														if (
															panelMode === "end"
														) {
															dispatch(
																setStartDate(
																	startDate
																)
															);
															dispatch(
																setEndDate(
																	dayjs().toISOString()
																)
															);
															setPanelMode(
																"start"
															);
														}
													}}
												>
													{i18n.t("Today")}
												</Button>
												<Button
													color="primary"
													variant="text"
													onClick={() => {
														dispatch(
															setStartDate(null)
														);
														dispatch(
															setEndDate(null)
														);
													}}
												>
													{i18n.t("Reset")}
												</Button>
											</Flex>
										)}
									/>
								</div>
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
							<Flex justify="space-between">
								<Text>{i18n.t("Dates")}</Text>
								{startDate && endDate && (
									<Text style={{ whiteSpace: "pre-wrap" }}>
										{dayjs(startDate).format(
											"D MMMM YYYY"
										) +
											"  -  " +
											dayjs(endDate).format(
												"D MMMM YYYY"
											)}
									</Text>
								)}
							</Flex>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
		</Flex>
	);
};

export default StageOne;
