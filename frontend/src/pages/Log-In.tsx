import {
	Button,
	Card,
	Checkbox,
	Col,
	Divider,
	Flex,
	Form,
	Input,
	theme,
	Typography,
} from "antd";
import { memo, useMemo, useState } from "react";
import "../styles/ant.css";
import { GoogleOutlined } from "@ant-design/icons";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import i18n from "../i18n";

const { Title } = Typography;
const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		token: { colorBgContainer, colorBorder },
	} = theme.useToken();
	const state = useAppSelector((state) => state.user);
	const [form] = Form.useForm();
	const { Text, Link } = Typography;
	const [loading, setLoading] = useState(false);

	const handleFormSubmit = (body: Object) => {
		setLoading(false);
		authService
			.login(body, dispatch)
			.then(({ data }) => {
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
					console.log(err);
				}
			});
	};
	return (
		<Flex
			justify="center"
			align="center"
			style={{ background: colorBgContainer, height: "100vh" }}
		>
			<Card
				style={{
					width: 450,
					border: `1.5px solid ${colorBorder}`,
					padding: 9,
				}}
				title={
					<Title level={3} style={{ marginBottom: 3, marginLeft: 5 }}>
						Log In
					</Title>
				}
			>
				<Form form={form} onFinish={handleFormSubmit} layout="vertical">
					<Form.Item
						label={i18n.t("Email")}
						name="email"
						rules={[
							{
								required: true,
								message: i18n.t("Please enter your email"),
							},
							{
								validator: (_, value) => {
									const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
									if (!regex.test(value)) {
										return Promise.reject(
											i18n.t("Invalid email format")
										);
									}

									return Promise.resolve();
								},
								validateTrigger: "onSubmit",
							},
						]}
					>
						<Input size="large" autoComplete="email" />
					</Form.Item>
					<Form.Item
						label={i18n.t("Password")}
						name="password"
						rules={[
							{
								required: true,
								message: i18n.t("Please enter your password"),
							},
						]}
					>
						<Input.Password size="large" autoComplete="password" />
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
					<Form.Item style={{ textAlign: "center" }}>
						<Text>{i18n.t("Don't have an account yet? ")}</Text>
						<Link href="sign-up" target="_self">
							{i18n.t("Create One")}
						</Link>
					</Form.Item>
				</Form>
				<Divider plain>{i18n.t("or")}</Divider>
				<Button
					icon={<GoogleOutlined />}
					iconPosition="start"
					block
					size="large"
					color="default"
				>
					{i18n.t("Log In with Google")}
				</Button>
			</Card>
		</Flex>
	);
};

export default Login;
