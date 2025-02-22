import {
	AutoComplete,
	Button,
	Flex,
	Input,
	theme,
	Typography,
	DatePicker,
	Tag,
	Divider,
	Select,
} from "antd";
import i18n from "../../i18n.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import Modal from "../../components/Modal.tsx";
import CloseButton from "../../components/CloseButton.tsx";
import StageOne from "./StageOne.tsx";
import StageTwo from "./StageTwo.tsx";
import {
	ArrowBack,
	ArrowBackRounded,
	ArrowForward,
	ArrowForwardRounded,
	EastRounded,
	LockRounded,
	PeopleAltRounded,
	PublicRounded,
} from "@mui/icons-material";
import {
	decrementStage,
	incrementStage,
	reset,
	setVisibility,
} from "../../redux/slices/createJourney.ts";
import { createElement, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import itineraryService from "../../services/itinerary.ts";
import useSnackbar from "../../components/showSnackbar.ts";

interface Prop {
	openCreateModal: boolean;
	setOpenCreateModal: (value: boolean) => void;
}

const { Text, Title } = Typography;
const stages = [StageOne, StageTwo];
const CreateModal = ({ openCreateModal, setOpenCreateModal }: Prop) => {
	const { token } = theme.useToken();
	const {
		colorBgContainer,
		borderRadius,
		fontSizeHeading5,
		colorText,
		colorPrimary,
		colorPrimaryBorder,
	} = token;

	const dispatch = useAppDispatch();
	const {
		currentStage,
		image,
		selectedTravellers,
		title,
		startDate,
		endDate,
		selectedDestinations,
		author,
		userEmail,
		visibility,
	} = useAppSelector((state) => ({
		currentStage: state.createJourney.currentStage,
		image: state.createJourney.image,
		selectedTravellers: state.createJourney.selectedTravellers,
		title: state.createJourney.title,
		startDate: state.createJourney.startDate,
		endDate: state.createJourney.endDate,
		selectedDestinations: state.createJourney.selectedDestinations,
		author: state.user.userID,
		userEmail: state.user.email,
		visibility: state.createJourney.visibility,
	}));
	const [openModalCloseConfirmation, setOpenModalCloseConfirmation] =
		useState(false);

		const [showSnackbar, context] = useSnackbar("An internal server error occurred. Please try again later.", "error");

	const createItinerary = () => {
		const itinerary = {
			author,
			title,
			startDate: startDate?.toDate(),
			endDate: endDate?.toDate(),
			destinations: selectedDestinations.map((destination) => ({
				name: destination.name,
				type: destination.type,
			})),
			travellers: [
				...selectedTravellers,
				{
					email: userEmail,
					permission: "Edit",
				},
			],
			visibility,
		};

		itineraryService.createItinerary(itinerary).then(() => {
			dispatch(reset());
			setOpenCreateModal(false);
		}).catch(()=>showSnackbar());
	};

	return (
		<>
		{context}
			<Modal
				open={openCreateModal}
				setOpen={() => setOpenModalCloseConfirmation(true)}
				centered
				title={
					<>
						<Flex justify="space-between" align="center">
							<Button
								variant="text"
								color="primary"
								icon={
									<ArrowBackRounded
										style={{ marginTop: 3.7 }}
									/>
								}
								iconPosition="start"
								style={{
									fontSize: fontSizeHeading5,
									paddingLeft: 7,
									paddingRight: 7,
									display:
										currentStage !== 0 ? "flex" : "none",
								}}
								onClick={() => dispatch(decrementStage())}
							>
								{i18n.t("Back")}
							</Button>
							<Title
								level={3}
								style={{
									fontWeight: 600,
									marginBottom: 0,
								}}
							>
								{i18n.t("Plan your new journey")}
							</Title>
							<Button
								style={{
									opacity: 0,
									width: 80,
									cursor: "default",
								}}
							></Button>
						</Flex>
						<Divider
							variant="dashed"
							style={{
								marginBottom: 0,
								marginTop: 10,
								borderColor: colorPrimaryBorder,
								borderWidth: 1.3,
							}}
						/>
					</>
				}
				style={{
					header: {
						padding: 2,
					},
					body: {
						padding: 2,
						height: 370,
					},
					footer: {
						padding: 0,
					},
				}}
				width={600}
				footer={
					<Flex justify="space-between" align="center">
						<Select
							value={visibility}
							variant="outlined"
							style={{ width: 130, textAlign: "left" }}
							onChange={(value: typeof visibility) =>
								dispatch(setVisibility(value))
							}
							labelRender={(label) => label.value}
							options={[
								{
									value: "Public",
									label: (
										<Flex
											justify="space-between"
											align="center"
										>
											<Text>Public</Text>
											<PublicRounded fontSize="small" />
										</Flex>
									),
								},
								{
									value: "Travellers",
									label: (
										<Flex
											justify="space-between"
											align="center"
										>
											<Text>Travellers</Text>
											<PeopleAltRounded fontSize="small" />
										</Flex>
									),
								},
								{
									value: "Only Me",
									label: (
										<Flex
											justify="space-between"
											align="center"
										>
											<Text>Only Me</Text>
											<LockRounded fontSize="small" />
										</Flex>
									),
								},
							]}
						/>
						{currentStage !== 1 ? (
							<Button
								color="default"
								variant="filled"
								size="large"
								onClick={() => dispatch(incrementStage())}
								disabled={
									!title ||
									!startDate ||
									!endDate ||
									selectedDestinations.length === 0
								}
								style={{ paddingLeft: 17, paddingRight: 17 }}
							>
								Next
							</Button>
						) : (
							<Button
								color="default"
								variant="filled"
								size="large"
								onClick={() => createItinerary()}
							>
								Create
							</Button>
						)}
					</Flex>
				}
			>
				{createElement(stages[currentStage])}
			</Modal>
			<Modal
				centered
				open={openModalCloseConfirmation}
				setOpen={setOpenModalCloseConfirmation}
				title="Heading Somewhere?"
				footer={[
					<Button
						onClick={() => setOpenModalCloseConfirmation(false)}
						color="default"
						variant="filled"
					>
						Cancel
					</Button>,
					<Button
						onClick={() => {
							dispatch(reset());
							setOpenModalCloseConfirmation(false);
							setOpenCreateModal(false);
						}}
						color="danger"
						variant="filled"
					>
						Discard Changes
					</Button>,
					<Button
						onClick={() => {
							setOpenModalCloseConfirmation(false);
							setOpenCreateModal(false);
						}}
						color="primary"
						variant="filled"
					>
						Save Changes
					</Button>,
				]}
			>
				<>
					<Text>
						Save your current changes so that you can continue later
					</Text>
					<br />
					<br />
				</>
			</Modal>
		</>
	);
};

export default CreateModal;

/*
<Button
							variant="text"
							color="primary"
							icon={
								currentStage !== stages.length - 1 && (
									<ArrowForwardRounded
										style={{ marginTop: 1.8 }}
									/>
								)
							}
							iconPosition="end"
							style={{
								fontSize: fontSizeHeading5,
								paddingLeft: 7,
								paddingRight: 7,
							}}
							onClick={() => dispatch(incrementStage())}
							disabled={
								!title ||
								!startDate ||
								!endDate ||
								selectedDestinations.length === 0
							}
						>
							{currentStage === stages.length - 1
								? i18n.t("Create")
								: i18n.t("Next")}
						</Button>
*/
