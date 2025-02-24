import { useEffect, useState } from "react";
import { JourneyType } from "../../../../backend/models/journey";
import journeyService from "../../services/journey";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, theme, Typography } from "antd";
import { useAppDispatch } from "../../redux/store";
import { setForbidden, setNotFound } from "../../redux/slices/error";
import { bufferToFile, generateFileURL } from "../../utilities/file";
import dayjs from "dayjs";

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
	useEffect(() => {
		journeyID
			? journeyService
					.getJourneyByID(journeyID)
					.then(({ data }) => {
						const image = data?.image as any;
						const file = bufferToFile(
							image.data,
							"image.png",
							"image/png"
						);
						setImage(file);

						setJourney(data);
						const fileUrl = URL.createObjectURL(file);
						console.log(fileUrl);
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
					})
			: navigate("/user/journey");
	}, []);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: colorBgContainer,
			}}
		>
			<div>
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
			<Flex
				vertical
				align="center"
				style={{ width: "100%", position: "absolute", top: 0 }}
			>
				<div
					style={{
						width: 700,
						height: 200,
						backgroundColor: colorBgContainer,
						padding: 15,
					}}
				>
					<Flex
						vertical
						justify="space-between"
						style={{ height: "100%" }}
					>
						<Title style={{ marginBottom: 0 }}>
							{journey?.title}
						</Title>
						<Flex justify="space-between">
							{" "}
							<Title style={{ marginBottom: 0 }}>
								<Text>
									{dayjs(journey?.startDate).format(
										"D MMMM YYYY"
									)}{" "}
									-{" "}
									{dayjs(journey?.endDate).format(
										"D MMMM YYYY"
									)}
								</Text>
							</Title>
						</Flex>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default Journey;
