import { useEffect, useState } from "react";
import { JourneyType } from "../../../../backend/models/journey";
import journeyService from "../../services/journey";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Card, Flex, Modal, theme, Tooltip, Typography } from "antd";
import { useAppDispatch } from "../../redux/store";
import { setForbidden, setNotFound } from "../../redux/slices/error";
import { bufferToFile, generateFileURL } from "../../utilities/file";
import dayjs from "dayjs";
import "../../assets/styles/ant.css";
import Calendar from "../../components/Calendar";
import useSnackbar from "../../components/useSnackbar";

const { Text, Title } = Typography;
const Journey = () => {
	const { journeyID } = useParams();
	const [journey, setJourney] = useState<JourneyType>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [image, setImage] = useState<File>();
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const [openCalendar, setOpenCalendar] = useState(false);

	useEffect(() => {
		if (journeyID) {
			journeyService
				.getJourneyByID(journeyID)
				.then((journey) => {
					setJourney(journey);
				})
				.catch(({ status }) => {
					// check for not found or invalid document id
					if (status === 404 || status === 400) {
						dispatch(setNotFound(true));
					}
					// check for insufficient permissions
					if (status === 403) {
						dispatch(setForbidden(true));
					}
				});
		} else {
			navigate("/user/journey");
		}
	}, []);

	const { createSnackbar, snackbarContext } = useSnackbar();
	const [openWarningSnackbar] = createSnackbar(
			"Please set valid start and end dates.","warning"
		);

	return (
		<>
			{snackbarContext}
			<Flex
				vertical
				style={{
					width: "100%",
					height: "100%",
					backgroundColor: colorBgContainer,
				}}
				justify="center"
			>
				<div style={{ position: "absolute", top: 0, zIndex: -1 }}>
					<img
						src={generateFileURL(image)}
						style={{
							height: 400,
							width: "100vw",
							objectFit: "fill",
							filter: "blur(9px) grayscale(50%) brightness(50%)",
							overflow: "hidden",
						}}
					/>
				</div>
				<br />
				<br />
				<Card
					style={{
						width: 700,
						height: 200,
						backgroundColor: colorBgContainer,
						padding: 15,
						margin: "auto",
					}}
					variant="borderless"
					size="small"
					styles={{ body: { height: "100%" } }}
				>
					<Flex
						vertical
						justify="space-between"
						style={{ height: "100%" }}
					>
						<Title
							style={{
								marginBottom: 0,
								border: 0,
								borderRadius: 10,
								whiteSpace: "nowrap",
								overflow: "hidden",
							}}
							contentEditable
							onInput={(e) => {
								const newValue = (e.target as HTMLElement)
									.innerText;

								journeyService.updateJourney(
									{ title: newValue },
									journeyID as string
								);
							}}
						>
							{journey?.title}
						</Title>
						<Flex justify="space-between" align="end">
							<Text
								style={{ fontWeight: 600, cursor: "pointer", fontSize:19, whiteSpace:"pre-wrap" }}
								onClick={() => setOpenCalendar(true)}
							>
								{dayjs(journey?.startDate).format(
									"D MMMM YYYY"
								)}{"  "}
								-{"  "}
								{dayjs(journey?.endDate).format("D MMMM YYYY")}
							</Text>
							<Flex>
								{journey?.travellers.map((traveller) => (
									<Tooltip
										title={"Can " + traveller.permission}
										color="grey"
										arrow={false}
										placement="bottom"
										styles={{
											body: {
												fontSize: 15,
												opacity: 0.9,
												position: "relative",
												top: 5,
											},
										}}
									>
										<Avatar>
											{traveller.email
												.charAt(0)
												.toUpperCase()}
										</Avatar>
									</Tooltip>
								))}
							</Flex>
						</Flex>
					</Flex>
				</Card>
				<Button>sex</Button>
			</Flex>
			<Modal
				open={openCalendar}
				footer={false}
				onCancel={() => {
					if (!journey?.startDate || !journey.endDate) {
						openWarningSnackbar();
					} else {
						setOpenCalendar(false);
					}
				}}
				centered
				title={<Title level={3}>Set Dates</Title>}
			>
				<Calendar
					start={journey?.startDate as string | undefined}
					end={journey?.endDate as string | undefined}
					setDates={(start, end) => {
						const newJourney : JourneyType = {...journey} as JourneyType;
						newJourney.startDate = start as any;
						newJourney.endDate = end as any;
						journeyService.updateJourney(
							{ startDate: start, endDate: end },
							journeyID as string
						);
						setJourney(newJourney);
					}}
				/>
			</Modal>
		</>
	);
};

export default Journey;
