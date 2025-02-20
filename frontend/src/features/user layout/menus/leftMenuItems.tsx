
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
				<Flex align="center" justify="center" gap={10}>
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
						{selectedLeftMenuItem === "home" ? (
							<HomeRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<HomeOutlinedIcon style={{ fontSize: 35 }} />
						)}
					</Tooltip>
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
				</Flex>
			),
			key: "home",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate(""),
		},
		{
			label: (
				<Flex align="center" justify="center" gap={10}>
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
						{selectedLeftMenuItem === "explore" ? (
							<ExploreRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<ExploreOutlinedIcon style={{ fontSize: 35 }} />
						)}
					</Tooltip>
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
			),
			key: "explore",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("explore"),
		},
		{
			label: (
				<Flex align="center" justify="center" gap={10}>
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
						{selectedLeftMenuItem === "upcoming" ? (
							<UpcomingRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<UpcomingOutlinedIcon style={{ fontSize: 35 }} />
						)}
					</Tooltip>
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
			),
			key: "upcoming",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("journey/upcoming"),
		},
		{
			label: (
				<Flex align="center" justify="center" gap={10}>
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
						{selectedLeftMenuItem === "completed" ? (
							<CheckCircleRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<CheckCircleOutlineRoundedIcon
								style={{ fontSize: 35 }}
							/>
						)}
					</Tooltip>
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
				</Flex>
			),
			key: "completed",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("journey/completed"),
		},
		{
			label: (
				<Flex align="center" justify="center" gap={11}>
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
						{selectedLeftMenuItem === "deleted" ? (
							<DeleteRoundedIcon style={{ fontSize: 35 }} />
						) : (
							<DeleteOutlineRoundedIcon
								style={{ fontSize: 35 }}
							/>
						)}
					</Tooltip>
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
				</Flex>
			),
			key: "deleted",
			style: { height: "auto", padding: 11 },
			onClick: () => navigate("journey/deleted"),
		},
	];
};
export default useLeftMenuItems;