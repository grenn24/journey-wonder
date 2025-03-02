import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Flex,
	FloatButton,
	Layout,
	Menu,
	Splitter,
	theme,
	Tooltip,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { lazy, Suspense, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import useBreakpoints from "../utilities/breakpoints";
import useLeftMenuItems from "../features/user layout/menus/leftMenuItems";
import UserHeader from "../features/user layout/Header";
import MobileFooterMenu from "../features/user layout/MobileFooterMenu";
import CreateModal from "../features/createJourney/CreateJourney";
import i18next from "i18next";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import GlobalError from "../pages/error/GlobalError";
import { useAppSelector } from "../redux/store";
import { setSplitterSize } from "../redux/slices/layout";
import Loading from "../pages/Loading";

const User = () => {
	const dispatch = useDispatch();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const { splitterSize } = useAppSelector((state) => state.layout);
	const breakpoints = useBreakpoints();
	const leftMenuItems = useLeftMenuItems(splitterSize);

	const [openCreateModal, setOpenCreateModal] = useState(false);

	const selectedLeftMenuItem = useMemo(
		() =>
			location.pathname
				.split("/")
				.slice(location.pathname.split("/").length - 1)[0] !== "user"
				? location.pathname
						.split("/")
						.slice(location.pathname.split("/").length - 1)[0]
				: "home",
		[location]
	);
	const handleMenuButtonClick = () =>
		Number(splitterSize[0]) > 100
			? dispatch(
					setSplitterSize([
						100,
						document.documentElement.clientWidth - 100,
					])
			  )
			: dispatch(
					setSplitterSize([
						280,
						document.documentElement.clientWidth - 280,
					])
			  );
	window.onresize = () =>
		dispatch(
			setSplitterSize([
				splitterSize[0],
				document.documentElement.clientWidth - splitterSize[0],
			])
		);

	return (
		<Suspense fallback={<Loading />}>
			<Layout style={{ height: "100dvh" }}>
				<Splitter
					onResize={(sizes) => dispatch(setSplitterSize(sizes))}
					style={{ backgroundColor: colorBgContainer }}
				>
					{breakpoints.largerThan("md") && (
						<Splitter.Panel
							size={splitterSize[0]}
							resizable
							min={100}
							max="25%"
						>
							<Flex
								vertical
								align="center"
								style={{
									height: "100%",
									paddingTop: 20,
									paddingBottom: 20,
								}}
							>
								<Button
									size="large"
									shape="circle"
									icon={
										Number(splitterSize[0]) > 100 ? (
											<ChevronLeftRounded />
										) : (
											<ChevronRightRounded />
										)
									}
									onClick={handleMenuButtonClick}
								/>
								<Flex
									justify="center"
									align="center"
									style={{ flexGrow: 1, width: "100%" }}
								>
									<Menu
										mode="vertical"
										defaultSelectedKeys={[
											selectedLeftMenuItem,
										]}
										items={leftMenuItems}
										style={{
											border: 0,
											width: "auto",
											height: "60%",
											display: "flex",
											justifyContent: "space-evenly",
											flexDirection: "column",
											position: "relative",
											bottom: 30,
										}}
									/>
								</Flex>
							</Flex>
						</Splitter.Panel>
					)}

					<Splitter.Panel size={splitterSize[1]} resizable>
						<Layout style={{ maxWidth: "100%" }}>
							<UserHeader />
							<Content>
								<Outlet />
							</Content>
						</Layout>
					</Splitter.Panel>
				</Splitter>
				{breakpoints.smallerThan("md") && <MobileFooterMenu />}
			</Layout>

			{breakpoints.largerThan("md") && (
				<Tooltip
					title={i18next.t("Create a new journey")}
					color="grey"
					placement="left"
					arrow={false}
					styles={{ body: { position: "relative", right: 15 } }}
				>
					<FloatButton
						style={{
							width: 50,
							height: 50,
							right: 70,
							bottom: 70,
						}}
						icon={<PlusOutlined />}
						onClick={() => setOpenCreateModal(true)}
					/>
				</Tooltip>
			)}

			<Suspense>
				<CreateModal
					openCreateModal={openCreateModal}
					setOpenCreateModal={setOpenCreateModal}
				/>
			</Suspense>
			<GlobalError />
		</Suspense>
	);
};

export default User;
