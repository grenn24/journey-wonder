import {
	Avatar,
	Button,
	Card,
	Flex,
	Input,
	Menu,
	Select,
	Tag,
	theme,
	Tooltip,
	Typography,
} from "antd";
import { ReactEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import {
	addTraveller,
	removeTraveller,
	compressAndSetImage,
	setVisibility,
	setDescription,
	setStage,
} from "../../../redux/slices/createJourney";
import "../../../styles/ant.css";
import {
	AddRounded,
	CheckRounded,
	ClearRounded,
	DeleteOutlineRounded,
	EditRounded,
	ExpandLessRounded,
	ExpandMoreRounded,
	LockRounded,
	PanoramaRounded,
	PeopleAltRounded,
	PublicRounded,
	VisibilityRounded,
} from "@mui/icons-material";
import ScrollableDiv from "../../../components/ScrollableDiv";
import userService from "../../../services/user";
import { AnimatePresence, motion } from "motion/react";
import ImageUpload from "../../../components/Image/ImageUpload";
import Image from "../../../components/Image/Image";
import i18n from "../../../i18n";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const { Text, Paragraph } = Typography;
const StageThree = () => {
	const dispatch = useDispatch();
	const { token } = theme.useToken();
	const { colorBgContainer, colorBorder, colorBgTextActive, colorBgBlur } =
		token;

	const [travellerEmail, setTravellerEmail] = useState("");

	const [travellerPermission, setTravellerPermission] = useState<
		"Edit" | "Read"
	>("Edit");
	const [isValidEmail, setIsValidEmail] = useState(false);
	const { journey, name } = useAppSelector((state) => ({
		journey: state.createJourney,
		name: state.user?.name,
	}));

	const [isTravellersExpanded, setIsTravellersExpanded] = useState(false);
	const [isVisibilityExpanded, setIsVisibilityExpanded] = useState(false);
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

	const addTravellerEmail: ReactEventHandler = (e) => {
		e.stopPropagation();
		console.log(travellerPermission);
		const traveller = {
			email: travellerEmail,
			permission: travellerPermission,
		};
		isValidEmail && travellerEmail && dispatch(addTraveller(traveller));
		setTravellerEmail("");
	};

	useEffect(() => {
		journey.visibility === "Only Me" && setIsTravellersExpanded(false);
	}, [journey.visibility]);
	return (
		<Flex vertical gap={20}>
			<Card
				styles={{
					body: {
						padding: 15,
					},
					header: {
						padding: "0px 15px",
					},
				}}
				style={{ borderColor: colorBorder, userSelect: "none" }}
		
				title={
					<Flex justify="space-between" align="center">
						{i18n.t("Journey Details")}
						<Button
						title="Edit"
							type="text"
							onClick={() => dispatch(setStage(0))}
							icon={<EditRounded fontSize="small" />}
						/>
					</Flex>
				}
				variant="outlined"
			>
				<div>
					<Flex gap={15} align="center" style={{ marginBottom: 15 }}>
						<Avatar size={30} />
						<Text>{name}</Text>
					</Flex>
					<Flex justify="space-between">
						<Text>{i18n.t("Title")}</Text>
						<Text>{journey.title}</Text>
					</Flex>
					<Flex justify="space-between">
						<Text>{i18n.t("Destinations")}</Text>
						<Text>
							{journey.destinations?.length <= 3
								? journey.destinations
										.map((dest) => dest.name)
										.join(", ")
								: journey.destinations
										?.slice(0, 3)
										.map((dest) => dest.name)
										.join(", ") + "..."}
						</Text>
					</Flex>
					<Flex justify="space-between">
						<Text>{i18n.t("Dates")}</Text>
						<Text>
							{" "}
							{dayjs(journey.startDate).format("D/M/YYYY") +
								"  -  " +
								dayjs(journey.endDate).format("D/M/YYYY")}
						</Text>
					</Flex>
				</div>
			</Card>
			<Card
				onClick={() => {
					if (journey.visibility !== "Only Me") {
						setIsTravellersExpanded(!isTravellersExpanded);
						setIsVisibilityExpanded(false);
						setIsDescriptionExpanded(false);
					}
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
				className="card-with-elevation"
				variant="borderless"
			>
				<AnimatePresence>
					{isTravellersExpanded ? (
						<motion.div
							key="expanded"
							initial={{ height: 0, opacity: 0, y: -25 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: -30 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex vertical gap={5}>
								<Flex justify="space-between">
									<Text
										style={{
											textAlign: "left",
											width: "100%",
											fontWeight: 600,
										}}
									>
										{i18n.t("Travellers")}
									</Text>
									<ExpandLessRounded
										style={{ fontSize: 25 }}
									/>
								</Flex>
								<div>
									<Input
										variant="borderless"
										type="email"
										status={
											isValidEmail || !travellerEmail
												? undefined
												: "error"
										}
										size="middle"
										placeholder={i18n.t(
											"Send an email invite"
										)}
										value={travellerEmail}
										onClick={(e) => e.stopPropagation()}
										onChange={(e) => {
											setTravellerEmail(e.target.value);
											setIsValidEmail(
												!userService.validateEmail(
													e.target.value
												)
											);
										}}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" &&
												isValidEmail
											) {
												addTravellerEmail(e);
											}
										}}
										required
										style={{
											width: "100%",
											padding: "5px 0px",
										}}
										suffix={
											<>
												<Select
													value={travellerPermission}
													variant="borderless"
													options={[
														{
															value: "Edit" as
																| "Edit"
																| "Read",
															label: (
																<EditRounded fontSize="small" />
															),
														},
														{
															value: "Read" as
																| "Edit"
																| "Read",
															label: (
																<VisibilityRounded fontSize="small" />
															),
														},
													]}
													labelRender={(label) => (
														<Flex
															style={{
																height: "100%",
															}}
															align="center"
														>
															{label.label}
														</Flex>
													)}
													optionRender={(option) => (
														<Flex
															style={{
																height: "auto",
															}}
															justify="flex-start"
															align="center"
														>
															{option.label}
														</Flex>
													)}
													onClick={(e) =>
														e.stopPropagation()
													}
													open={
														isValidEmail &&
														travellerEmail
															? undefined
															: false
													}
													style={{
														width: 52,
														left: 15,

														opacity:
															isValidEmail &&
															travellerEmail
																? 1
																: 0,
													}}
													onSelect={(value) => {
														setTravellerPermission(
															value
														);
													}}
													className="select-without-arrow"
												/>
												<Button
													variant="text"
													color="default"
													icon={<AddRounded />}
													style={{
														opacity:
															isValidEmail &&
															travellerEmail
																? 1
																: 0,
													}}
													onClick={addTravellerEmail}
												/>
											</>
										}
									/>
									{
										<Text
											style={{
												fontSize: 14,
												opacity:
													!isValidEmail &&
													travellerEmail
														? 1
														: 0,
											}}
											type="danger"
										>
											The email format is invalid
										</Text>
									}
								</div>

								<ScrollableDiv
									height={35}
									style={{
										display:
											journey.travellers.length === 0
												? "none"
												: "flex",
									}}
								>
									{journey.travellers
										? journey.travellers?.map(
												(traveller) => (
													<Tooltip
														title={
															"Can " +
															traveller.permission
														}
														arrow={false}
														placement="bottom"
														color="grey"
														styles={{
															body: {
																fontSize: 15,
																opacity: 0.9,
																position:
																	"relative",
																top: 5,
															},
														}}
													>
														<Tag
															bordered={false}
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
																	removeTraveller(
																		traveller
																	)
																)
															}
															onClick={(e) =>
																e.stopPropagation()
															}
															style={{
																backgroundColor:
																	colorBgTextActive,

																padding:
																	"3px 7px",
																display: "flex",
																alignItems:
																	"center",
															}}
														>
															{traveller.email}
														</Tag>
													</Tooltip>
												)
										  )
										: []}
								</ScrollableDiv>
							</Flex>
						</motion.div>
					) : (
						<motion.div
							key="collapsed"
							initial={{ height: 0, opacity: 0, y: 0 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex gap={10} align="center">
								<Flex justify="space-between" flex={1}>
									<Text
										disabled={
											journey.visibility === "Only Me"
										}
										style={{ fontWeight: 600 }}
									>
										{i18n.t("Travellers")}
									</Text>

									<Text>
										{journey.visibility !== "Only Me"
											? journey.travellers?.length +
											  " " +
											  i18n.t("Travellers")
											: i18n.t("Only Me")}
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
					setIsVisibilityExpanded(!isVisibilityExpanded);
					setIsTravellersExpanded(false);
					setIsDescriptionExpanded(false);
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
				className="card-with-elevation"
				variant="borderless"
			>
				<AnimatePresence>
					{isVisibilityExpanded ? (
						<motion.div
							key="expanded"
							initial={{ height: 0, opacity: 0, y: -25 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: -30 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex vertical gap={5}>
								<Flex justify="space-between">
									<Text
										style={{
											textAlign: "left",
											width: "100%",
											fontWeight: 600,
										}}
									>
										{i18n.t("Visibility")}
									</Text>
									<ExpandLessRounded
										style={{ fontSize: 25 }}
									/>
								</Flex>

								<div onClick={(e) => e.stopPropagation()}>
									<Menu
										selectedKeys={[journey.visibility]}
										style={{ border: 0 }}
									>
										<Menu.Item
											key="Public"
											onClick={() =>
												dispatch(
													setVisibility("Public")
												)
											}
											style={{
												padding: "0px 10px",
												width: "101%",
												transform: "translateX(-1%)",
											}}
										>
											<Flex
												justify="space-between"
												align="center"
												style={{ width: "100%" }}
											>
												<Flex align="center" gap={10}>
													{i18n.t("Public")}
													<PublicRounded fontSize="small" />
												</Flex>

												{journey.visibility ===
													"Public" && (
													<CheckRounded />
												)}
											</Flex>
										</Menu.Item>
										<Menu.Item
											key="Travellers"
											onClick={() =>
												dispatch(
													setVisibility("Travellers")
												)
											}
											style={{
												padding: "0px 10px",
												width: "101%",
												transform: "translateX(-1%)",
											}}
										>
											<Flex
												justify="space-between"
												align="center"
												style={{ width: "100%" }}
											>
												<Flex align="center" gap={10}>
													{i18n.t("Travellers")}
													<PeopleAltRounded fontSize="small" />
												</Flex>
												{journey.visibility ===
													"Travellers" && (
													<CheckRounded />
												)}
											</Flex>
										</Menu.Item>
										<Menu.Item
											key="Only Me"
											onClick={() =>
												dispatch(
													setVisibility("Only Me")
												)
											}
											style={{
												padding: "0px 10px",
												width: "101%",
												transform: "translateX(-1%)",
											}}
										>
											<Flex
												justify="space-between"
												align="center"
												style={{ width: "100%" }}
											>
												<Flex align="center" gap={10}>
													{i18n.t("Only Me")}
													<LockRounded fontSize="small" />
												</Flex>

												{journey.visibility ===
													"Only Me" && (
													<CheckRounded />
												)}
											</Flex>
										</Menu.Item>
									</Menu>
								</div>
							</Flex>
						</motion.div>
					) : (
						<motion.div
							key="collapsed"
							initial={{ height: 0, opacity: 0, y: 0 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex gap={10} align="center">
								<Flex justify="space-between" flex={1}>
									<Text style={{ fontWeight: 600 }}>
										{i18n.t("Visibility")}
									</Text>
									<Text>{i18n.t(journey.visibility)}</Text>
								</Flex>
								<ExpandMoreRounded style={{ fontSize: 25 }} />
							</Flex>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
			<Card
				onClick={() => {
					setIsDescriptionExpanded(!isDescriptionExpanded);
					setIsTravellersExpanded(false);
					setIsVisibilityExpanded(false);
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
					marginBottom: 13,
				}}
				className="card-with-elevation"
				variant="borderless"
			>
				<AnimatePresence>
					{isDescriptionExpanded ? (
						<motion.div
							key="expanded"
							initial={{ height: 0, opacity: 0, y: -25 }}
							animate={{ height: "auto", opacity: 1, y: 0 }}
							exit={{ height: 0, opacity: 0, y: -30 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex vertical gap={5}>
								<Flex justify="space-between">
									<Text
										style={{
											textAlign: "left",
											width: "100%",
											fontWeight: 600,
										}}
									>
										{i18n.t("Description")}
									</Text>
									<ExpandLessRounded
										style={{ fontSize: 25 }}
									/>
								</Flex>

								<div onClick={(e) => e.stopPropagation()}>
									<TextArea
										variant="borderless"
										value={journey.description}
										onChange={(e) =>
											dispatch(
												setDescription(e.target.value)
											)
										}
										placeholder="Add a description"
										autoSize={{ minRows: 5, maxRows: 5 }}
										style={{
											padding: "5px 0px",
											borderRadius: 0,
										}}
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
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Flex gap={10} align="center">
								<Flex justify="space-between" flex={1}>
									<Text style={{ fontWeight: 600 }}>
										{i18n.t("Description")}
									</Text>
									<Text>
										{journey.description.length > 35
											? journey.description.slice(0, 35) +
											  "..."
											: journey.description}
									</Text>
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

export default StageThree;
