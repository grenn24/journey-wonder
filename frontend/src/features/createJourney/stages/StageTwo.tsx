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
} from "antd";
import { ReactEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import {
	addTraveller,
	removeTraveller,
	compressAndSetImage,
} from "../../../redux/slices/createJourney";
import {
	AddRounded,
	ClearRounded,
	DeleteOutlineRounded,
	EditRounded,
	PanoramaRounded,
	VisibilityRounded,
} from "@mui/icons-material";
import "../../../assets/styles/ant.css";
import ScrollableDiv from "../../../components/ScrollableDiv";
import userService from "../../../services/user";
import { AnimatePresence, motion } from "motion/react";
import ImageUpload from "../../../components/Image/ImageUpload";
import Image from "../../../components/Image/Image";
import i18n from "../../../i18n";

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
	const { image, selectedTravellers, visibility } = useAppSelector(
		(state) => ({
			image: state.createJourney?.image,
			selectedTravellers: state.createJourney?.travellers,
			visibility: state.createJourney?.visibility,
		})
	);

	const [isTravellersExpanded, setIsTravellersExpanded] = useState(false);

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
		visibility === "Only Me" && setIsTravellersExpanded(false);
	}, [visibility]);
	return (
		<div style={{height:"100%", overflow:"hidden"}}>
			<ImageUpload
				className="draggable-upload-image"
				aspectRatio={21 / 9}
				images={image ? [image[0] as any] : []}
				defaultImageRenderType="block"
				maxUploads={1}
				setImages={(images) => {
					images.length === 0
						? dispatch(compressAndSetImage(null) as any)
						: dispatch(compressAndSetImage(images[0]) as any);
				}}
				CustomImageRender={({ image, handleDelete }) => (
					<Image
						image={image}
						height={360}
						buttons={[
							<Button
								variant="filled"
								color="default"
								style={{
									backgroundColor: "rgb(255,255,255,0.1)",
								}}
								icon={
									<DeleteOutlineRounded
										style={{ color: "white" }}
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
						<Text> {i18n.t("Upload or drop a photo")}</Text>
					</Flex>
				}
				acceptedFileTypes="image/jpeg, image/png, image/gif"
			/>
		</div>
	);
};

export default StageTwo;
