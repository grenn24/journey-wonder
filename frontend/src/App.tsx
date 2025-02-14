import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/store";
import "./styles/App.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Typography, theme } from "antd";
import Guest from "./layouts/Guest";
import Login from "./pages/Log-In";
import User from "./layouts/User";
import { Theme } from "./redux/slices/theme";

const { Text } = Typography;

const App = () => {
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	return (
		<ConfigProvider
			theme={{
				algorithm:
					globalTheme === Theme.Light
						? theme.defaultAlgorithm
						: window.matchMedia("(prefers-color-scheme: dark)")
								.matches
						? theme.darkAlgorithm
						: theme.defaultAlgorithm,
				token: {
					fontFamily: "Liter",
					borderRadius: 16,
					borderRadiusSM: 20,
					borderRadiusLG: 20,
				},
			}}
		>
			<BrowserRouter>
				<Routes>
					{/*Non-protected routes*/}
					<Route index />
					<Route path="guest" element={<Guest />}>
						<Route path="about" />
						<Route path="pricing" />
						<Route path="explore" />
					</Route>
					<Route path="guest/account">
						<Route path="log-in" element={<Login />} />
						<Route path="sign-up" />
					</Route>
					{/*Protected routes*/}
					<Route path="user" element={<User />}>
						<Route index />
						<Route path="explore" />

						<Route path="journey">
							<Route path=":journeyID" />

							<Route path="upcoming" />
							<Route path="completed" />
							<Route path="deleted" />
						</Route>
					

						<Route path="profile" />
						<Route path="settings" />
					</Route>
					{/*Missed routes*/}
					<Route path="*" />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
