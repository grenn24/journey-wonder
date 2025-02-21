
import {
	Button,
	Flex,
	theme,
	Tooltip,
	Typography,
} from "antd";
import {  useNavigate } from "react-router-dom";
import {
	UpcomingOutlined as UpcomingOutlinedIcon,
	UpcomingRounded as UpcomingRoundedIcon,
	CheckCircleRounded as CheckCircleRoundedIcon,
	CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
	DeleteRounded as DeleteRoundedIcon,
	DeleteOutlineRounded as DeleteOutlineRoundedIcon,
	ChevronLeftRounded as ChevronLeftRoundedIcon,
	ChevronRightRounded as ChevronRightRoundedIcon,
	HomeOutlined as HomeOutlinedIcon,
	HomeRounded as HomeRoundedIcon,
	ExploreOutlined as ExploreOutlinedIcon,
	ExploreRounded as ExploreRoundedIcon,
} from "@mui/icons-material";
import { use } from "react";
import i18next from "i18next";

const { Text,Title } = Typography;
const useLeftMenuItems = (
	splitterSize: (number | string)[]
) => {
	const selectedLeftMenuItem =
		location.pathname
			.split("/")
			.slice(location.pathname.split("/").length - 1)[0] !== "user"
			? location.pathname
					.split("/")
					.slice(location.pathname.split("/").length - 1)[0]
			: "home";
	const navigate = useNavigate();

	return [
		{
			label: (
				<Tooltip
					title="Home"
					placement="bottom"
					arrow={false}
					color="grey"
					styles={{
						body: {
							opacity: 0.7,
							position: "relative",
							top: 14,
						},
					}}
				>
					<Flex align="center" justify="center" gap={10}>
						{selectedLeftMenuItem === "home" ? (
							<HomeRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<HomeOutlinedIcon style={{ fontSize: 35 }} />
						)}

						{(splitterSize[0] as number) > 290 && (
							<Title
								level={4}
								style={{
									fontFamily: "Poppins",
									fontWeight: 600,
									marginBottom: 0,
								}}
							>
								{i18next.t("Home")}
							</Title>
						)}
					</Flex>{" "}
				</Tooltip>
			),
			key: "home",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate(""),
		},
		{
			label: (
				<Tooltip
					title="Explore"
					placement="bottom"
					arrow={false}
					color="grey"
					styles={{
						body: {
							opacity: 0.7,
							position: "relative",
							top: 14,
						},
					}}
				>
					<Flex align="center" justify="center" gap={10}>
						{selectedLeftMenuItem === "explore" ? (
							<ExploreRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<ExploreOutlinedIcon style={{ fontSize: 35 }} />
						)}

						{(splitterSize[0] as number) > 290 && (
							<Title
								level={4}
								style={{
									fontFamily: "Poppins",
									fontWeight: 600,
									marginBottom: 0,
								}}
							>
								{i18next.t("Explore")}
							</Title>
						)}
					</Flex>
				</Tooltip>
			),
			key: "explore",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("explore"),
		},
		{
			label: (
				<Tooltip
					title="Upcoming Journeys"
					placement="bottom"
					arrow={false}
					color="grey"
					styles={{
						body: {
							opacity: 0.7,
							position: "relative",
							top: 14,
						},
					}}
				>
					<Flex align="center" justify="center" gap={10}>
						{selectedLeftMenuItem === "upcoming" ? (
							<UpcomingRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<UpcomingOutlinedIcon style={{ fontSize: 35 }} />
						)}

						{(splitterSize[0] as number) > 290 && (
							<Title
								level={4}
								style={{
									fontFamily: "Poppins",
									fontWeight: 600,
									marginBottom: 0,
								}}
							>
								{i18next.t("Upcoming Journeys")}
							</Title>
						)}
					</Flex>
				</Tooltip>
			),
			key: "upcoming",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("journey/upcoming"),
		},
		{
			label: (
				<Tooltip
					title="Completed Journeys"
					placement="bottom"
					arrow={false}
					color="grey"
					styles={{
						body: {
							opacity: 0.7,
							position: "relative",
							top: 14,
						},
					}}
				>
					<Flex align="center" justify="center" gap={10}>
						{selectedLeftMenuItem === "completed" ? (
							<CheckCircleRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<CheckCircleOutlineRoundedIcon
								style={{ fontSize: 35 }}
							/>
						)}

						{(splitterSize[0] as number) > 290 && (
							<Title
								level={4}
								style={{
									fontFamily: "Poppins",
									fontWeight: 600,
									marginBottom: 0,
								}}
							>
								{i18next.t("Completed Journeys")}
							</Title>
						)}
					</Flex>{" "}
				</Tooltip>
			),
			key: "completed",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("journey/completed"),
		},
		{
			label: (
				<Tooltip
					title="Deleted Journeys"
					placement="bottom"
					arrow={false}
					color="grey"
					styles={{
						body: {
							opacity: 0.7,
							position: "relative",
							top: 14,
						},
					}}
				>
					<Flex align="center" justify="center" gap={11}>
						{selectedLeftMenuItem === "deleted" ? (
							<DeleteRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<DeleteOutlineRoundedIcon
								style={{ fontSize: 35 }}
							/>
						)}

						{(splitterSize[0] as number) > 290 && (
							<Title
								level={4}
								style={{
									fontFamily: "Poppins",
									fontWeight: 600,
									marginBottom: 0,
								}}
							>
								{i18next.t("Deleted Journeys")}{" "}
							</Title>
						)}
					</Flex>{" "}
				</Tooltip>
			),
			key: "deleted",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("journey/deleted"),
		},
	];
};
export default useLeftMenuItems;