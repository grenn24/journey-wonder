
import {
	Button,
	Flex,
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

const { Text } = Typography;
const useLeftMenuItems = (
	splitterSize: (number | string)[],
	setSplitterSize: (value: (number | string)[]) => void
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
	const handleMenuButtonClick = () =>
		Number(splitterSize[0]) > 100
			? setSplitterSize([100, window.innerWidth - 100])
			: setSplitterSize([280, "100%"]);

	return [
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					<Button
						size="large"
						shape="circle"
						icon={
							Number(splitterSize[0]) > 100 ? (
								<ChevronLeftRoundedIcon />
							) : (
								<ChevronRightRoundedIcon />
							)
						}
						onClick={handleMenuButtonClick}
					/>
				</Flex>
			),
			key: "arrow",
			disabled: true,
			style: { height: 70 },
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedLeftMenuItem === "home" ? (
						<HomeRoundedIcon />
					) : (
						<HomeOutlinedIcon />
					)}
					<Text>{i18next.t("Home")}</Text>
				</Flex>
			),
			key: "home",
			style: { height: 80 },
			onClick: () => navigate(""),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedLeftMenuItem === "explore" ? (
						<ExploreRoundedIcon />
					) : (
						<ExploreOutlinedIcon />
					)}
					<Text>{i18next.t("Explore")}</Text>
				</Flex>
			),
			key: "explore",
			style: { height: 80 },
			onClick: () => navigate("explore"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedLeftMenuItem === "upcoming" ? (
						<UpcomingRoundedIcon />
					) : (
						<UpcomingOutlinedIcon />
					)}
					<Text>{i18next.t("Upcoming Journeys")}</Text>
				</Flex>
			),
			key: "upcoming",
			style: { height: 80 },
			onClick: () => navigate("journey/upcoming"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedLeftMenuItem === "completed" ? (
						<CheckCircleRoundedIcon />
					) : (
						<CheckCircleOutlineRoundedIcon />
					)}
					<Text>{i18next.t("Completed Journeys")}</Text>
				</Flex>
			),
			key: "completed",
			style: { height: 80 },
			onClick: () => navigate("journey/completed"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedLeftMenuItem === "deleted" ? (
						<DeleteRoundedIcon />
					) : (
						<DeleteOutlineRoundedIcon />
					)}
					<Text>{i18next.t("Deleted Journeys")}</Text>
				</Flex>
			),
			key: "deleted",
			style: { height: 80 },
			onClick: () => navigate("journey/deleted"),
		},
	];
};
export default useLeftMenuItems;