import {
	AirplaneTicketOutlined,
	AttachFileOutlined,
	AutoAwesomeOutlined,
	CalendarMonthOutlined,
	DoneOutlined,
	EventOutlined,
	FlightTakeoffOutlined,
	HotelOutlined,
	PeopleAltOutlined,
	PictureAsPdfOutlined,
	PublicOutlined,
	QueryBuilderOutlined,
} from "@mui/icons-material";
import {
	Button,
	Card,
	Col,
	Flex,
	List,
	Row,
	Segmented,
	Tag,
	theme,
	Typography,
} from "antd";
import { useState } from "react";
import useBreakpoints from "../../utilities/breakpoints";
import { useAppSelector } from "../../redux/store";
const { Title, Text } = Typography;
const Pricing = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const [type, setType] = useState<"Annually" | "Monthly">("Annually");
	const breakpoints = useBreakpoints();
	const { membershipTier, freeTrialUsed } = useAppSelector((state) => ({
		membershipTier: state.user.membershipTier,
		freeTrialUsed: state.user.freeTrialUsed,
	}));
	return (
		<>
			<title>Pricing | Journey Wonder</title>
			<meta
				name="description"
				content="Get priority access to exclusive travel planning tools, curated itineraries, and premium support. Choose your plan today."
			></meta>
			<div
				style={{
					width: "100%",
					height: "100%",
					backgroundColor: colorBgContainer,
					position: "relative",
				}}
			>
				<Flex vertical align="center">
					<br />
					<br />
					<br />
					<Title style={{ fontSize: 55, whiteSpace: "nowrap" }}>
						Plan like a Pro
					</Title>
					<Text
						style={{
							fontSize: 20,
							padding: "0px 30px",
							textAlign: "center",
						}}
					>
						Get full access to the premium features you need, from
						just{" "}
						<Text
							style={{
								textDecoration: "underline",
								fontSize: 20,
							}}
						>
							$0.50
						</Text>{" "}
						a day.
					</Text>
					<Text style={{ fontSize: 20 }}>Try it for free.</Text>
					<br />
					<Segmented
						options={
							["Monthly", "Annually"] as (
								| "Annually"
								| "Monthly"
							)[]
						}
						size="large"
						value={type}
						onChange={(value) => setType(value)}
					/>
					<br />
					<Row
						gutter={[32, 32]}
						style={{
							width: breakpoints.largerThan("lg")
								? "auto"
								: "100%",
						}}
					>
						{type === "Annually" ? (
							<>
								<Col
									xs={{ span: 24 }}
									lg={{ span: 12 }}
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Card
										style={{
											width: breakpoints.largerThan("lg")
												? 450
												: "90%",
											height: 450,
											borderColor: "rgba(0, 0, 0, 0.17)",
										}}
										variant="outlined"
										styles={{ body: { height: "100%" } }}
									>
										<Flex
											vertical
											justify="space-between"
											style={{ height: "100%" }}
										>
											<Flex
												justify="space-between"
												align="top"
											>
												<Flex
													align="center"
													gap={15}
													style={{ height: 40 }}
												>
													<Title
														level={2}
														style={{ margin: 0 }}
													>
														Pro
													</Title>
													<Tag color="success">
														Save 40%
													</Tag>
												</Flex>
												<Flex vertical align="end">
													<Flex align="end">
														<Title
															level={3}
															style={{
																margin: 0,
															}}
														>
															$14.95
														</Title>
														<Text>/mo</Text>
													</Flex>
													<Text
														style={{ fontSize: 15 }}
													>
														Billed Annually
													</Text>
												</Flex>
											</Flex>

											<Flex
												flex={1}
												style={{ marginTop: 15 }}
											>
												<List
													dataSource={[
														{
															title: "All Lite features included",
															icon: (
																<DoneOutlined />
															),
														},
														{
															title: "Invite unlimited travellers",
															icon: (
																<PeopleAltOutlined />
															),
														},
														{
															title: "AI powered event suggestions",
															icon: (
																<AutoAwesomeOutlined />
															),
														},
														{
															title: "Real-time flight tracker",
															icon: (
																<FlightTakeoffOutlined />
															),
														},
														{
															title: "Real-time hotel searching",
															icon: (
																<HotelOutlined />
															),
														},
														{
															title: "Sync with Google Calendar",
															icon: (
																<CalendarMonthOutlined />
															),
														},
														{
															title: "14-day free trial",
															icon: (
																<QueryBuilderOutlined />
															),
														},
													]}
													renderItem={(item) => (
														<List.Item
															style={{
																border: 0,
																padding:
																	"5px 0px",
															}}
														>
															<Flex
																justify="space-between"
																style={{
																	width: "100%",
																}}
															>
																<Text>
																	{item.title}
																</Text>
																{item.icon}
															</Flex>
														</List.Item>
													)}
													bordered={false}
													style={{ width: "100%" }}
												/>
											</Flex>
											<Button
												size="large"
												variant="solid"
												color="primary"
												style={{ fontWeight: 500 }}
												disabled={
													membershipTier === "Pro"
												}
												onClick={() =>
													freeTrialUsed
														? window.open(
																"https://buy.stripe.com/bIYcOSgs7dGUadi007",
																"_blank"
														  )
														: window.open(
																"https://buy.stripe.com/6oEcOSgs78mA99e4gj",
																"_blank"
														  )
												}
											>
												{membershipTier !== "Pro"
													? freeTrialUsed
														? "Upgrade"
														: "Upgrade for free"
													: "Current"}
											</Button>
											<Text
												style={{
													width: "100%",
													textAlign: "center",
													opacity: 0.65,
													fontSize: 15,
												}}
											>
												14-day free trial - cancel
												anytime
											</Text>
										</Flex>
									</Card>
								</Col>
								<Col
									xs={{ span: 24 }}
									lg={{ span: 12 }}
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Card
										style={{
											width: breakpoints.largerThan("lg")
												? 450
												: "90%",
											height: 450,
											borderColor: "rgba(0, 0, 0, 0.17)",
										}}
										variant="outlined"
										styles={{ body: { height: "100%" } }}
									>
										<Flex
											vertical
											justify="space-between"
											style={{ height: "100%" }}
										>
											<Flex
												justify="space-between"
												align="top"
											>
												<Flex
													align="center"
													gap={15}
													style={{ height: 40 }}
												>
													<Title
														level={2}
														style={{ margin: 0 }}
													>
														Lite
													</Title>
													<Tag color="success">
														Save 50%
													</Tag>
												</Flex>

												<Flex vertical align="end">
													<Flex align="end">
														<Title
															level={3}
															style={{
																margin: 0,
															}}
														>
															$9.95
														</Title>
														<Text>/mo</Text>
													</Flex>
													<Text
														style={{ fontSize: 15 }}
													>
														Billed Annually
													</Text>
												</Flex>
											</Flex>
											<Flex
												flex={1}
												style={{ marginTop: 15 }}
											>
												<List
													dataSource={[
														{
															title: "Unlimited Itineraries",
															icon: (
																<AirplaneTicketOutlined />
															),
														},

														{
															title: "Unlimited Events",
															icon: (
																<EventOutlined />
															),
														},
														{
															title: "Unlimited File Attachments",
															icon: (
																<AttachFileOutlined />
															),
														},
														{
															title: "Invite up to 3 travellers",
															icon: (
																<PeopleAltOutlined />
															),
														},
														{
															title: "Map View Integration",
															icon: (
																<PublicOutlined />
															),
														},
														{
															title: "Export Itinerary as PDF",
															icon: (
																<PictureAsPdfOutlined />
															),
														},
														{
															title: "14-day free trial",
															icon: (
																<QueryBuilderOutlined />
															),
														},
													]}
													renderItem={(item) => (
														<List.Item
															style={{
																border: 0,
																padding:
																	"5px 0px",
															}}
														>
															<Flex
																justify="space-between"
																align="center"
																style={{
																	width: "100%",
																}}
															>
																<Text>
																	{item.title}
																</Text>
																{item.icon}
															</Flex>
														</List.Item>
													)}
													bordered={false}
													style={{ width: "100%" }}
												/>
											</Flex>
											<Button
												size="large"
												variant="solid"
												color="primary"
												style={{ fontWeight: 500 }}
												disabled={
													membershipTier === "Lite"
												}
												onClick={() =>
													freeTrialUsed
														? window.open(
																"https://buy.stripe.com/bIYeX0a3J5ao4SYfZ3",
																"_blank"
														  )
														: window.open(
																"https://buy.stripe.com/cN2dSWb7NbyM2KQ7st",
																"_blank"
														  )
												}
											>
												{membershipTier !== "Lite"
													? membershipTier === "Pro"
														? "Change"
														: freeTrialUsed
														? "Upgrade"
														: "Upgrade for free"
													: "Current"}
											</Button>
											<Text
												style={{
													width: "100%",
													textAlign: "center",
													opacity: 0.65,
													fontSize: 15,
												}}
											>
												14-day free trial - cancel
												anytime
											</Text>
										</Flex>
									</Card>
								</Col>
							</>
						) : (
							<>
								<Col
									xs={{ span: 24 }}
									lg={{ span: 12 }}
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Card
										style={{
											width: breakpoints.largerThan("lg")
												? 450
												: "90%",
											height: 450,
											borderColor: "rgba(0, 0, 0, 0.17)",
										}}
										variant="outlined"
										styles={{ body: { height: "100%" } }}
									>
										<Flex
											vertical
											justify="space-between"
											style={{ height: "100%" }}
										>
											<Flex
												justify="space-between"
												align="top"
											>
												<Flex
													align="center"
													gap={15}
													style={{ height: 40 }}
												>
													<Title
														level={2}
														style={{ margin: 0 }}
													>
														Pro
													</Title>
												</Flex>
												<Flex vertical align="end">
													<Flex align="end">
														<Title
															level={3}
															style={{
																margin: 0,
															}}
														>
															$24.95
														</Title>
														<Text>/mo</Text>
													</Flex>
													<Text
														style={{ fontSize: 15 }}
													>
														Billed Monthly
													</Text>
												</Flex>
											</Flex>
											<Flex
												flex={1}
												style={{ marginTop: 15 }}
											>
												<List
													dataSource={[
														{
															title: "All Lite features included",
															icon: (
																<DoneOutlined />
															),
														},
														{
															title: "Invite unlimited travellers",
															icon: (
																<PeopleAltOutlined />
															),
														},
														{
															title: "AI powered event suggestions",
															icon: (
																<AutoAwesomeOutlined />
															),
														},
														{
															title: "Real-time flight tracker",
															icon: (
																<FlightTakeoffOutlined />
															),
														},
														{
															title: "Real-time hotel searching",
															icon: (
																<HotelOutlined />
															),
														},
														{
															title: "Sync with Google Calendar",
															icon: (
																<CalendarMonthOutlined />
															),
														},
														{
															title: "14-day free trial",
															icon: (
																<QueryBuilderOutlined />
															),
														},
													]}
													renderItem={(item) => (
														<List.Item
															style={{
																border: 0,
																padding:
																	"5px 0px",
															}}
														>
															<Flex
																justify="space-between"
																style={{
																	width: "100%",
																}}
															>
																<Text>
																	{item.title}
																</Text>
																{item.icon}
															</Flex>
														</List.Item>
													)}
													bordered={false}
													style={{ width: "100%" }}
												/>
											</Flex>
											<Button
												size="large"
												variant="solid"
												color="primary"
												style={{ fontWeight: 500 }}
												disabled={
													membershipTier === "Pro"
												}
												onClick={() =>
													freeTrialUsed
														? window.open(
																"https://buy.stripe.com/3cs16acbR32g71628e",
																"_blank"
														  )
														: window.open(
																"https://buy.stripe.com/5kAg147VBeKYbhm9AC",
																"_blank"
														  )
												}
											>
												{membershipTier !== "Pro"
													? freeTrialUsed
														? "Upgrade"
														: "Upgrade for free"
													: "Current"}
											</Button>
											<Text
												style={{
													width: "100%",
													textAlign: "center",
													opacity: 0.65,
													fontSize: 15,
												}}
											>
												14-day free trial - cancel
												anytime
											</Text>
										</Flex>
									</Card>
								</Col>
								<Col
									xs={{ span: 24 }}
									lg={{ span: 12 }}
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Card
										style={{
											width: breakpoints.largerThan("lg")
												? 450
												: "90%",
											height: 450,
											borderColor: "rgba(0, 0, 0, 0.17)",
										}}
										variant="outlined"
										styles={{ body: { height: "100%" } }}
									>
										{" "}
										<Flex
											vertical
											justify="space-between"
											style={{ height: "100%" }}
										>
											<Flex
												justify="space-between"
												align="top"
											>
												<Flex
													align="center"
													gap={15}
													style={{ height: 40 }}
												>
													<Title
														level={2}
														style={{ margin: 0 }}
													>
														Lite
													</Title>
												</Flex>
												<Flex vertical align="end">
													<Flex align="end">
														<Title
															level={3}
															style={{
																margin: 0,
															}}
														>
															$19.95
														</Title>
														<Text>/mo</Text>
													</Flex>
													<Text
														style={{ fontSize: 15 }}
													>
														Billed Monthly
													</Text>
												</Flex>
											</Flex>
											<Flex
												flex={1}
												style={{ marginTop: 15 }}
											>
												<List
													dataSource={[
														{
															title: "Unlimited Itineraries",
															icon: (
																<AirplaneTicketOutlined />
															),
														},

														{
															title: "Unlimited Events",
															icon: (
																<EventOutlined />
															),
														},
														{
															title: "Unlimited File Attachments",
															icon: (
																<AttachFileOutlined />
															),
														},
														{
															title: "Invite up to 3 travellers",
															icon: (
																<PeopleAltOutlined />
															),
														},
														{
															title: "Map View Integration",
															icon: (
																<PublicOutlined />
															),
														},
														{
															title: "Export Itinerary as PDF",
															icon: (
																<PictureAsPdfOutlined />
															),
														},
														{
															title: "14-day free trial",
															icon: (
																<QueryBuilderOutlined />
															),
														},
													]}
													renderItem={(item) => (
														<List.Item
															style={{
																border: 0,
																padding:
																	"5px 0px",
															}}
														>
															<Flex
																justify="space-between"
																align="center"
																style={{
																	width: "100%",
																}}
															>
																<Text>
																	{item.title}
																</Text>
																{item.icon}
															</Flex>
														</List.Item>
													)}
													bordered={false}
													style={{ width: "100%" }}
												/>
											</Flex>
											<Button
												size="large"
												variant="solid"
												color="primary"
												style={{ fontWeight: 500 }}
												disabled={
													membershipTier === "Lite"
												}
												onClick={() =>
													freeTrialUsed
														? window.open(
																"https://buy.stripe.com/5kA8yC2Bh8mA3OUfZ2",
																"_blank"
														  )
														: window.open(
																"https://buy.stripe.com/cN2aGKa3JauI1GM8ww",
																"_blank"
														  )
												}
											>
												{membershipTier !== "Lite"
													? membershipTier === "Pro"
														? "Change"
														: freeTrialUsed
														? "Upgrade"
														: "Upgrade for free"
													: "Current"}
											</Button>
											<Text
												style={{
													width: "100%",
													textAlign: "center",
													opacity: 0.65,
													fontSize: 15,
												}}
											>
												14-day free trial - cancel
												anytime
											</Text>
										</Flex>
									</Card>
								</Col>
							</>
						)}
					</Row>
					<br />
				</Flex>
			</div>
		</>
	);
};

export default Pricing;
