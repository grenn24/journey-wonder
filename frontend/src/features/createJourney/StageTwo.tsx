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
import Image from "../../components/Image";
import { ClearRounded, DeleteOutlineRounded } from "@mui/icons-material";
import Dragger from "antd/es/upload/Dragger";
import "../../styles/ant.css";
import CloseButton from "../../components/CloseButton";
import ScrollableDiv from "../../components/ScrollableDiv";
import userService from "../../services/user";

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
					{isTravellersExpanded ? (
						<Flex vertical gap={10}>
							<Text style={{ textAlign: "left", width: "100%" }}>
								Travellers
							</Text>
							<Input
								type="email"
								status={
									isEmailValid || !traveller
										? undefined
										: "error"
								}
								size="large"
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
									if (e.key === "Enter" && isEmailValid) {
										dispatch(addTraveller(traveller));
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
											dispatch(removeTraveller(email))
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
										{email}
									</Tag>
								))}
							</ScrollableDiv>
						</Flex>
					) : (
						<Flex justify="space-between">
							<Text>Travellers</Text>
							<Text>{selectedTravellers.length} Travellers</Text>
						</Flex>
					)}
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

			<ImgCrop rotationSlider showGrid aspect={16 / 9}>
				{image ? (
					<Image
						image={image.originFileObj}
						width="100%"
						height={200}
						buttons={[
							<Button
								icon={
									<DeleteOutlineRounded
										sx={{
											fontSize: 24,
										}}
									/>
								}
								variant="text"
								color="default"
								style={{
									backgroundColor: "rgb(255,255,255,0.6)",
								}}
								onClick={() => dispatch(deleteImage())}
							/>,
						]}
					/>
				) : (
					<Dragger
						maxCount={1}
						listType="picture-card"
						onChange={({ fileList }) => {
							if (fileList.length !== 0) {
								fileList[0].status = "done" as UploadFileStatus;
								dispatch(setImage({ ...fileList[0] }));
							} else {
								dispatch(setImage(null));
							}
						}}
						showUploadList={{
							showPreviewIcon: false,
							showRemoveIcon: true,
						}}
					>
						<button
							style={{ border: 0, background: "none" }}
							type="button"
						>
							<PlusOutlined />{" "}
							<Text style={{ marginTop: 8 }}>
								Click or drag a cover photo
							</Text>
						</button>{" "}
					</Dragger>
				)}
			</ImgCrop>
		</Flex>
	);
};

export default StageTwo;
