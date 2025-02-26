import {
	Button,
	Card,
	Checkbox,
	Divider,
	Flex,
	Form,
	Image,
	Input,
	theme,
	Typography,
} from "antd";
import { useState } from "react";
import "../styles/ant.css";
import { AppleFilled } from "@ant-design/icons";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import i18n from "../i18n";
import googleLogo from "../assets/images/google/google.svg";
import useBreakpoints from "../utilities/breakpoints";
import LanguageMenu from "../features/guest layout/LanguageMenu";
import journeyWonderIcon from "../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg";
import useSnackbar from "../components/useSnackbar";


const { Title } = Typography;
const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		token: { colorBgContainer, colorBorder, fontWeightStrong },
	} = theme.useToken();
	const [form] = Form.useForm();
	const { Text, Link } = Typography;
	const [loading, setLoading] = useState(false);
	const breakpoints = useBreakpoints();
	const { createSnackbar, snackbarContext } = useSnackbar();
	const [openErrorSnackbar] = createSnackbar(
		i18n.t("An internal server error occurred. Please try again later."),
		"error"
	);

	const handleFormSubmit = (body: Object) => {
		setLoading(false);
		authService
			.login(body, dispatch)
			.then(() => {
				setLoading(false);
				navigate("/user");
				form.resetFields();
			})
			.catch((err) => {
				const { body } = err;
				if (body?.status === "INVALID_EMAIL_PASSWORD") {
					form.setFields([
						{
							name: "email",
							errors: [i18n.t("Invalid email or password")],
						},
						{
							name: "password",
							errors: [i18n.t("Invalid email or password")],
						},
					]);
				} else {
					openErrorSnackbar();
				}
			});
	};
	return (
		<>
			{snackbarContext}
			<title>Log In | Journey Wonder</title>
			<meta
				name="description"
				content="Log In to Journey Wonder and start planning your next journey today."
			></meta>
			<Flex
				justify="center"
				align="center"
				style={{ background: colorBgContainer, height: "100vh" }}
			>
				<Flex
					style={{
						width: "100%",
						height: "100%",
						position: "relative",
					}}
					justify="center"
					align="center"
				>
					<Card
						style={{
							width: 450,
							border: `0px solid ${colorBorder}`,
							padding: 9,
						}}
						styles={{
							header: {
								borderBottom: `0px solid ${colorBorder}`,
								marginBottom: 20,
							},
						}}
						title={
							<Flex
								vertical
								justify="space-between"
								gap={7}
								style={{ marginBottom: 6 }}
							>
								<Title level={1} style={{ margin: 0 }}>
									{i18n.t("Log In")}
								</Title>
								<Title
									level={5}
									style={{ margin: 0, fontWeight: 400 }}
								>
									{i18n.t("Unlock Your Next Destination")}
								</Title>
							</Flex>
						}
					>
						<Flex gap={15}>
							<Button
								icon={
									<img
										src={googleLogo}
										alt="Google Logo"
										width="20"
									/>
								}
								iconPosition="start"
								block
								size="large"
								color="default"
								styles={{
									icon: {
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
									},
								}}
								style={{
									fontWeight: fontWeightStrong,
									borderRadius: 10,
								}}
							>
								{i18n.t("Google")}
							</Button>
							<Button
								icon={<AppleFilled />}
								iconPosition="start"
								block
								size="large"
								color="default"
								styles={{
									icon: {
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
									},
								}}
								style={{
									fontWeight: fontWeightStrong,
									borderRadius: 10,
								}}
							>
								{i18n.t("Apple")}
							</Button>
						</Flex>
						<Divider plain style={{ border: 0 }}>
							{i18n.t("or")}
						</Divider>
						<Form
							form={form}
							onFinish={handleFormSubmit}
							layout="vertical"
						>
							<Form.Item
								label={i18n.t("Email")}
								name="email"
								rules={[
									{
										required: true,
										message: i18n.t(
											"Please enter your email"
										),
									},
									{
										validator: (_, value) => {
											const regex =
												/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
											if (!regex.test(value)) {
												return Promise.reject(
													i18n.t(
														"Invalid email format"
													)
												);
											}

											return Promise.resolve();
										},
										validateTrigger: "onSubmit",
									},
								]}
							>
								<Input
									size="large"
									autoComplete="email"
									variant="filled"
								/>
							</Form.Item>
							<Form.Item
								label={i18n.t("Password")}
								name="password"
								rules={[
									{
										required: true,
										message: i18n.t(
											"Please enter your password"
										),
									},
								]}
							>
								<Input.Password
									size="large"
									autoComplete="password"
									variant="filled"
								/>
							</Form.Item>
							<Form.Item label={null}>
								<Flex justify="space-between" align="center">
									<Form.Item
										valuePropName="checked"
										name="remember"
										noStyle
									>
										<Checkbox className="custom-checkbox">
											{i18n.t("Remember Me")}
										</Checkbox>
									</Form.Item>

									<Link href="" target="_self">
										{i18n.t("Forgot Password")}
									</Link>
								</Flex>
							</Form.Item>
							<Form.Item>
								<Button
									block
									type="primary"
									htmlType="submit"
									size="large"
									loading={loading}
								>
									{i18n.t("Log In")}
								</Button>
							</Form.Item>
							<Text style={{ whiteSpace: "pre-wrap" }}>
								{i18n.t("Don't have an account yet?   ")}
							</Text>
							<Link
								href="sign-up"
								target="_self"
								style={{ fontSize: 15 }}
							>
								{i18n.t("Create One")}
							</Link>
						</Form>
					</Card>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
						}}
					>
						<Flex
							justify="space-between"
							align="center"
							style={{ margin: "15px 15px" }}
						>
							<a
								href="/guest"
								target="_self"
								rel="noopener noreferrer"
								title="Journey Wonder"
							>
								<Image
									width={50}
									src={journeyWonderIcon}
									preview={false}
									style={{ marginBottom: 2 }}
								/>
							</a>
							<LanguageMenu placement="bottomRight" />
						</Flex>
					</div>
				</Flex>
				<div
					style={{
						width: "100%",
						height: "50%",
						display: breakpoints.largerThan("lg") ? "flex" : "none",
					}}
				></div>
			</Flex>
		</>
	);
};

export default Login;
