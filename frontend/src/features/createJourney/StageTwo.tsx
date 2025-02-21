import { PlusOutlined } from "@ant-design/icons";
import { TextField, ThemeProvider } from "@mui/material";
import {
	Button,
	Card,
	Flex,
	Input,
	Tag,
	theme,
	Typography,
	Upload,
	UploadFile,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
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
	ClearRounded,
	DeleteOutlineRounded,
	DeleteRounded,
	PanoramaRounded,
} from "@mui/icons-material";
import Dragger from "antd/es/upload/Dragger";
import "../../styles/ant.css";
import CloseButton from "../../components/CloseButton";
import ScrollableDiv from "../../components/ScrollableDiv";
import userService from "../../services/user";
import { AnimatePresence, motion } from "motion/react";
import ImageUpload from "../../components/Image/ImageUpload";
import Image from "../../components/Image";

const { Text } = Typography;
const StageTwo = () => {
	const dispatch = useDispatch();
	const { token } = theme.useToken();
	const { colorBgContainer, colorBorder } = token;

	const [traveller, setTraveller] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const { image, selectedTravellers } = useAppSelector((state) => ({
		image: state.createJourney.image,
		selectedTravellers: state.createJourney.selectedTravellers,
	}));

	const [isTravellersExpanded, setIsTravellersExpanded] = useState(false);
	const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

	return (
		<Flex vertical justify="space-between" style={{ height: "100%" }}>
			<Flex vertical>
				<Card
					onClick={() => {
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
											isEmailValid || !traveller
												? undefined
												: "error"
										}
										size="middle"
										placeholder="Send an email invite to your friends"
										value={traveller}
										onClick={(e) => e.stopPropagation()}
										onChange={(e) => {
											setTraveller(e.target.value);
											setIsEmailValid(
												!userService.validateEmail(
													e.target.value
												)
											);
										}}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" &&
												isEmailValid
											) {
												dispatch(
													addTraveller(traveller)
												);
												setTraveller("");
											}
										}}
										required
										style={{ width: "100%" }}
										suffix={
											<CloseButton
												variant="text"
												handleButtonClick={(e) => {
													e.stopPropagation();
													setTraveller("");
												}}
												style={{
													opacity: traveller ? 1 : 0,
													cursor: "pointer",
												}}
											/>
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
										{selectedTravellers?.map((email) => (
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
														removeTraveller(email)
													)
												}
												onClick={(e) =>
													e.stopPropagation()
												}
												style={{
													borderColor: colorBorder,
													backgroundColor:
														colorBgContainer,

													padding: "5px 12px",

													display: "flex",
													alignItems: "center",
												}}
											>
												{email}
											</Tag>
										))}
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
									<Text>Travellers</Text>
									<Text>
										{selectedTravellers.length} Travellers
									</Text>
								</Flex>
							</motion.div>
						)}
					</AnimatePresence>
					<Button
						onClick={() => setIsTravellersExpanded(false)}
						variant="text"
						color="default"
						style={{
							position: "absolute",
							display: isTravellersExpanded ? "flex" : "none",
							top: 10,
							right: 10,
						}}
						size="small"
						icon={<ClearRounded />}
					/>
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
							<Text>Add a picture</Text>
						</Flex>
					}
					acceptedFileTypes="image/jpeg, image/png, image/gif"
				/>
	
		</Flex>
	);
};

export default StageTwo;
