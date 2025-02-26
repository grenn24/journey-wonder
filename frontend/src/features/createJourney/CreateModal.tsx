"use server";
import { Button, Flex, theme, Typography, Divider, Select } from "antd";
import { createElement, lazy, memo, useState } from "react";
import i18n from "../../i18n.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import Modal from "../../components/Modal.tsx";
const StageOne = lazy(() => import("./StageOne.tsx"));
const StageTwo = lazy(() => import("./StageTwo.tsx"));
import {
	ArrowBackRounded,
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

import journeyService from "../../services/journey.ts";
import useSnackbar from "../../components/useSnackbar.ts";
import { base64UrlToFile } from "../../utilities/file.ts";

interface Prop {
	openCreateModal: boolean;
	setOpenCreateModal: (value: boolean) => void;
}

const { Text, Title } = Typography;
const stages = [StageOne, StageTwo];
const CreateModal = ({ openCreateModal, setOpenCreateModal }: Prop) => {
	const { token } = theme.useToken();
	const { fontSizeHeading5, colorPrimaryBorder } = token;

	const dispatch = useAppDispatch();
	const {
		currentStage,
		image,
		selectedTravellers,
		title,
		startDate,
		endDate,
		selectedDestinations,
		visibility,
		userID,
		email,
	} = useAppSelector((state) => ({ ...state.createJourney, ...state.user }));
	const [openModalCloseConfirmation, setOpenModalCloseConfirmation] =
		useState(false);

	const { createSnackbar, snackbarContext } = useSnackbar();
	const [openErrorSnackbar] = createSnackbar(
		i18n.t("An internal server error occurred. Please try again later."),
		"error"
	);
	const [openUploadingSnackbar, closeUploadingSnackbar] = createSnackbar(
		i18n.t("Creating your journey"),
		"loading",
		1000000
	);

	const createItinerary = async () => {
		openUploadingSnackbar();
		const itinerary = {
			author: userID,
			title,
			startDate,
			endDate,
			destinations: selectedDestinations.map((destination) => ({
				name: destination.name,
				type: destination.type,
			})),
			travellers: [
				...selectedTravellers,
				{
					email: email,
					permission: "Edit",
				},
			],
			image: image ? await base64UrlToFile(image[0], image[1]) : null,
			visibility,
		};

		journeyService
			.createJourney(itinerary)
			.then(() => {
				closeUploadingSnackbar();
				dispatch(reset());
				setOpenCreateModal(false);
			})
			.catch(() => {
				closeUploadingSnackbar();
				openErrorSnackbar();
			});
	};

	return (
		<>
			{snackbarContext}

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
				width="100%"
				footer={
					<Flex justify="space-between" align="center">
						<Select
							value={visibility}
							variant="outlined"
							style={{ width: 130, textAlign: "left" }}
							onChange={(value: typeof visibility) =>
								dispatch(setVisibility(value))
							}
							labelRender={(label) =>
								i18n.t(label.value.toString())
							}
							options={[
								{
									value: "Public",
									label: (
										<Flex
											justify="space-between"
											align="center"
										>
											<Text>{i18n.t("Public")}</Text>
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
											<Text>{i18n.t("Travellers")}</Text>
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
											<Text>{i18n.t("Only Me")}</Text>
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
								{i18n.t("Next")}
							</Button>
						) : (
							<Button
								color="default"
								variant="filled"
								size="large"
								onClick={() => createItinerary()}
							>
								{i18n.t("Create")}
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
				title={i18n.t("Heading Somewhere?")}
				footer={[
					<Button
						onClick={() => setOpenModalCloseConfirmation(false)}
						color="default"
						variant="filled"
						key="cancel"
					>
						{i18n.t("Cancel")}
					</Button>,
					<Button
						onClick={() => {
							dispatch(reset());
							setOpenModalCloseConfirmation(false);
							setOpenCreateModal(false);
						}}
						color="danger"
						variant="filled"
						key="save"
					>
						{i18n.t("Discard")}
					</Button>,
					<Button
						onClick={() => {
							setOpenModalCloseConfirmation(false);
							setOpenCreateModal(false);
						}}
						color="primary"
						variant="filled"
						key="discard"
					>
						{i18n.t("Save")}
					</Button>,
				]}
			>
				<>
					<Text>
						{i18n.t(
							"Save your current changes so that you can continue later"
						)}
					</Text>
					<br />
					<br />
				</>
			</Modal>
		</>
	);
};

export default memo(CreateModal);

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
