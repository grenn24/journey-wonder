import { PlusOutlined } from "@ant-design/icons";
import { TextField, ThemeProvider } from "@mui/material";
import {
	Button,
	Card,
	Flex,
	Input,
	Select,
	Tag,
	theme,
	Tooltip,
	Typography,
	Upload,
	UploadFile,
} from "antd";
import ImgCrop from "antd-img-crop";
import { ReactEventHandler, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
	addTraveller,
	deleteImage,
	removeTraveller,
	setImage,
} from "../../redux/slices/createJourney";
import { UploadFileStatus } from "antd/es/upload/interface";
import "../../styles/ant.css";
import { useMuiTheme } from "../../styles/useTheme";
import ImageViewer from "../../components/Image";
import {
	AddRounded,
	ClearRounded,
	DeleteOutlineRounded,
	DeleteRounded,
	EditRounded,
	PanoramaRounded,
	VisibilityRounded,
} from "@mui/icons-material";
import Dragger from "antd/es/upload/Dragger";
import "../../styles/ant.css";
import CloseButton from "../../components/CloseButton";
import ScrollableDiv from "../../components/ScrollableDiv";
import userService from "../../services/user";
import { AnimatePresence, motion } from "motion/react";
import ImageUpload from "../../components/Image/ImageUpload";
import Image from "../../components/Image";
import Itinerary from "../../../../backend/models/itinerary";
import itineraryService from "../../services/itinerary";
import { permission } from "process";

const { Text } = Typography;
const StageTwo = () => {
	const dispatch = useDispatch();
	const { token } = theme.useToken();
	const { colorBgContainer, colorBorder } = token;

	const [travellerEmail, setTravellerEmail] = useState("");

	const [travellerPermission, setTravellerPermission] = useState<
		"Edit" | "Read"
	>("Edit");
	const [isValidEmail, setIsValidEmail] = useState(false);
	const {
		image,
		selectedTravellers,
		visibility,
	} = useAppSelector((state) => ({
		image: state.createJourney.image,
		selectedTravellers: state.createJourney.selectedTravellers,
		visibility: state.createJourney.visibility,
	}));

	const [isTravellersExpanded, setIsTravellersExpanded] = useState(false);
	const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

	const addTravellerEmail: ReactEventHandler = (e) => {
		e.stopPropagation();
		const traveller = {
			email: travellerEmail,
			permission: travellerPermission,
		};
		isValidEmail && travellerEmail && dispatch(addTraveller(traveller));
		setTravellerEmail("");
	};


	useEffect(() => {
		visibility === "Only Me" && setIsTravellersExpanded(false);
	}, [visibility]);
	return (
		<Flex vertical justify="space-between" style={{ height: "100%" }}>
			<Flex vertical>
				<Card
					onClick={() => {
						visibility !== "Only Me" &&
							setIsTravellersExpanded(!isTravellersExpanded);
					}}
					styles={{
						body: {
							padding: 15,
						},
					}}
					style={{ borderWidth: 2, borderColor: colorBorder }}
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
								<Flex vertical gap={10}>
									<Text
										style={{
											textAlign: "left",
											width: "100%",
										}}
									>
										Travellers
									</Text>
									<Input
										type="email"
										status={
											isValidEmail || !travellerEmail
												? undefined
												: "error"
										}
										size="middle"
										placeholder="Send an email invite to your friends"
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
										style={{ width: "100%" }}
										suffix={
											<>
												<Select
													defaultValue={{
														value: "Edit",
														label: (
															<EditRounded fontSize="small" />
														),
													}}
													variant="borderless"
													options={[
														{
															value: "Edit",
															label: (
																<EditRounded fontSize="small" />
															),
														},
														{
															value: "View",
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
														marginRight: 0,
														opacity:
															isValidEmail &&
															travellerEmail
																? 1
																: 0,
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
									<ScrollableDiv
										height={35}
										style={{
											display:
												selectedTravellers.length === 0
													? "none"
													: "flex",
										}}
									>
										{selectedTravellers?.map(
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
																removeTraveller(
																	traveller
																)
															)
														}
														onClick={(e) =>
															e.stopPropagation()
														}
														style={{
															borderColor:
																colorBorder,
															backgroundColor:
																colorBgContainer,

															padding: "5px 12px",

															display: "flex",
															alignItems:
																"center",
														}}
													>
														{traveller.email}
													</Tag>
												</Tooltip>
											)
										)}
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
								<Flex justify="space-between">
									<Text disabled={visibility === "Only Me"}>
										Travellers
									</Text>
									<Text>
										{visibility !== "Only Me"
											? selectedTravellers.length +
											  " Travellers"
											: "Only Me"}
									</Text>
								</Flex>
							</motion.div>
						)}
					</AnimatePresence>
				</Card>
			</Flex>

			<ImageUpload
				className="draggable-upload-image"
				aspectRatio={16 / 9}
				images={image ? [image] : []}
				defaultImageRenderType="block"
				maxUploads={1}
				setImages={(images) =>
					images.length === 0
						? dispatch(setImage(null))
						: dispatch(setImage(images[0]))
				}
				CustomImageRender={({ image, handleDelete }) => (
					<Image
						image={image}
						buttons={[
							<Button
								variant="filled"
								color="default"
								style={{
									backgroundColor: "rgb(255,255,255,0.1)",
								}}
								icon={
									<DeleteOutlineRounded
										style={{ color: colorBgContainer }}
									/>
								}
								onClick={() => handleDelete()}
							/>,
						]}
					/>
				)}
				message={
					<Flex vertical justify="center" align="center">
						<PanoramaRounded style={{ fontSize: 38 }} />
						<Text>Add a cover photo</Text>
					</Flex>
				}
				acceptedFileTypes="image/jpeg, image/png, image/gif"
			/>
		</Flex>
	);
};

export default StageTwo;
