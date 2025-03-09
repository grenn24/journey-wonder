"use server";
import {
	Button,
	Flex,
	theme,
	Typography,
	Divider,
} from "antd";
import { createElement, memo, useState } from "react";
import i18n from "../../i18n.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import Modal from "../../components/Modal.tsx";

import {
	ArrowBackRounded,
	LockRounded,
	PeopleAltRounded,
	PublicRounded,
	WestRounded,
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
import stages from "./stages/index.ts";
import { stageNames } from "./stages/index.ts";

interface Prop {
	openCreateModal: boolean;
	setOpenCreateModal: (value: boolean) => void;
}

const { Text, Title } = Typography;

const CreateModal = ({ openCreateModal, setOpenCreateModal }: Prop) => {
	const { token } = theme.useToken();
	const { fontSizeHeading5, colorPrimaryBorder } = token;

	const dispatch = useAppDispatch();
	const { journey, user } = useAppSelector((state) => ({
		journey: state.createJourney,
		user: state.user,
	}));
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

	const createJourney = async () => {
		openUploadingSnackbar();

		journeyService
			.createJourney( {
			...journey,
			author: user.userID,
			destinations: journey.destinations.map((destination) => ({
				name: destination.name,
				type: destination.type,
			})),
			travellers: [
				...journey.travellers,
				{
					email: user.email,
					permission: "Edit",
				},
			],
			image: journey.image
				? await base64UrlToFile(
						journey.image[0],
						journey.image[1]
				  )
				: null,
			currentStage: undefined,
		})
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
		<div>
			{snackbarContext}

				<Modal
					open={openCreateModal}
					setOpen={() => setOpenModalCloseConfirmation(true)}
					centered
					title={
						<>
							<Flex
								justify="space-between"
								align="center"
								style={{ height: 30 }}
							>
								<Button
									variant="text"
									color="default"
									size="large"
									style={{
										display:
											journey.currentStage !== 0
												? "flex"
												: "none",
									}}
									onClick={() => dispatch(decrementStage())}
									icon={
										<WestRounded style={{ fontSize: 30 }} />
									}
								></Button>
								<Title
									style={{
										fontSize: 22,
										fontWeight: 600,
										marginBottom: 0,
										userSelect: "none",
									}}
								>
									{stageNames[journey.currentStage]}
								</Title>
								<Button
									variant="text"
									color="default"
									size="large"
									style={{
										display:
											journey.currentStage !== 0
												? "flex"
												: "none",
										opacity: 0,
									}}
									onClick={() => dispatch(decrementStage())}
									icon={
										<WestRounded style={{ fontSize: 30 }} />
									}
								></Button>
							</Flex>
							<Divider
								variant="dashed"
								style={{
									margin: "10px 0px",
									borderColor: colorPrimaryBorder,
									borderWidth: 1.3,
								}}
							/>
						</>
					}
					style={{
						header: {
							padding: "0px 0px",
						},
						body: {
							padding: "5px 6px",
							height: 370,
							width:"102%",
							transform: "translateX(-1%)",
							overflow: "auto",
						},
						footer: {
							padding: "5px 5px",
						},
						wrapper: {
							backdropFilter: `blur(5px)`,
							background: "rgba(0, 0, 0, 0.3)",
						},
					}}
					footer={
						<Flex justify="center" align="center">
							{journey.currentStage !== stages.length - 1 ? (
								<Button
									block
									color="primary"
									variant="solid"
									size="middle"
									onClick={() => dispatch(incrementStage())}
									disabled={
										!journey.title ||
										!journey.startDate ||
										!journey.endDate ||
										journey.destinations?.length === 0
									}
									style={{
										fontSize: 19,
									}}
								>
									{i18n.t("Next")}
								</Button>
							) : (
								<Button
									block
									color="primary"
									variant="solid"
									size="middle"
									onClick={() => createJourney()}
									style={{
										fontSize: 19,
									}}
								>
									{i18n.t("Create")}
								</Button>
							)}
						</Flex>
					}
				>
					{createElement(stages[journey.currentStage])}
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
	
		</div>
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

/*
		<Tooltip
							title="Visibility"
							placement="bottom"
							color="grey"
							arrow={false}
							styles={{
								body: {
									position: "relative",
									top: 10,
								},
							}}
						>
							<Select
								value={visibility}
								variant="filled"
								style={{ width: 120, textAlign: "left" }}
								onChange={(value: typeof visibility) =>
									dispatch(setVisibility(value))
								}
								labelRender={(label) => (
									<a title="">
										<Text>
											{i18n.t(label.value.toString())}
										</Text>
									</a>
								)}
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
												<Text>
													{i18n.t("Travellers")}
												</Text>
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
						</Tooltip>
*/
